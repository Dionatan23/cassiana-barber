/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface Barbeiro {
  id: number;
  name: string;
  email: string;
  barbeiroInfo: {
    foto: string | null;
    horarioTrabalho: string | null;
    status: string;
    servicos?: any[];
  };
}

export function useBarbeiros() {
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBarbeiros = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/barbeiros");
      if (!res.ok) {
        const text = await res.text().catch(() => res.statusText);
        throw new Error(`HTTP ${res.status}: ${text}`);
      }
      const data = await res.json();
      setBarbeiros(data);
    } catch (err: any) {
      console.error(err);
      setError("Erro ao carregar barbeiros.");
      toast.error("Erro ao carregar barbeiros.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBarbeiros();
  }, []);

  return { barbeiros, loading, error, refetch: fetchBarbeiros };
}
