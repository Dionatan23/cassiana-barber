/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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
import { toast } from "sonner";

interface ModalAddServicoProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  servico?: any | null;
  onSuccess?: () => Promise<void>;
}

export function ModalAddServico({
  open,
  onOpenChange,
  servico,
  onSuccess,
}: ModalAddServicoProps) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nome: servico?.nome || "",
    preco: servico?.preco?.toString() || "",
    duracao: servico?.duracao?.toString() || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.preco || !formData.duracao) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      const dataToSend = {
        nome: formData.nome,
        preco: parseFloat(formData.preco),
        duracao: parseInt(formData.duracao),
      };

      const res = await fetch(
        servico ? `/api/admin/servico/${servico.id}` : "/api/admin/servico",
        {
          method: servico ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!res.ok) throw new Error("Erro ao salvar o serviço.");

      toast.success(
        servico ? "Serviço atualizado com sucesso!" : "Serviço adicionado com sucesso!"
      );

      if (onSuccess) await onSuccess();
      onOpenChange?.(false);
    } catch (error: any) {
      console.error(error);
      toast.error("Erro ao salvar o serviço.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {servico ? "Editar Serviço" : "Adicionar Serviço"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Serviço *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Ex: Corte de cabelo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preco">Preço (R$) *</Label>
            <Input
              id="preco"
              type="number"
              step="0.01"
              value={formData.preco}
              onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
              placeholder="Ex: 40.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duracao">Duração (minutos) *</Label>
            <Input
              id="duracao"
              type="number"
              value={formData.duracao}
              onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
              placeholder="Ex: 30"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => onOpenChange?.(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="gradient-primary" disabled={loading}>
              {loading ? "Salvando..." : servico ? "Salvar Alterações" : "Cadastrar Serviço"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
