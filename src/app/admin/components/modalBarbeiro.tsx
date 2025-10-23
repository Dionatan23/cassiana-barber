/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Barbeiro } from "@/lib/mockData";

export function ModalBarbeiro({
  open,
  onOpenChange,
  barbeiro,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  barbeiro?: Barbeiro | null;
  onSuccess?: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<Barbeiro>>({
    nome: "",
    foto: "",
    horarioTrabalho: "",
    status: "ativo",
    servicos: [],
    email: "",
    password: "",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (barbeiro) {
        setFormData(barbeiro);
      } else {
        setFormData({
          nome: "",
          foto: "",
          horarioTrabalho: "",
          status: "ativo",
          servicos: [],
          email: "",
          password: "",
        });
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [barbeiro, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.horarioTrabalho) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const generateEmail = (nome: string) =>
      nome.toLowerCase().replace(/\s+/g, ".") + "@barbearia.com";

    const barbeiroData = {
      nome: formData.nome!,
      email: formData.email || generateEmail(formData.nome!),
      password: formData.password || "barbeiro123",
      horarioTrabalho: formData.horarioTrabalho!,
      status: formData.status || "ativo",
    };

    try {
      setLoading(true);

      const res = await fetch("/api/admin/barbeiros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(barbeiroData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Erro ao cadastrar barbeiro");
      }

      toast.success("Barbeiro cadastrado com sucesso!");
      onOpenChange(false);
      if (onSuccess) {
        await onSuccess();
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Erro ao cadastrar barbeiro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {barbeiro ? "Editar Barbeiro" : "Adicionar Barbeiro"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
              placeholder="Nome completo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="exemplo@barbearia.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="barbeiro123"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="horario">Horário de Trabalho *</Label>
            <Input
              id="horario"
              value={formData.horarioTrabalho}
              onChange={(e) =>
                setFormData({ ...formData, horarioTrabalho: e.target.value })
              }
              placeholder="Ex: 09:00 - 18:00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  status: value as "ativo" | "inativo",
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="gradient-primary cursor-pointer"
              disabled={loading}
            >
              {loading ? "Salvando..." : barbeiro ? "Salvar" : "Cadastrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
