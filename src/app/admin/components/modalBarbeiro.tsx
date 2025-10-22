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
import { Barbeiro } from "@/lib/mockData";
import { toast } from "sonner";

interface BarbeiroFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  barbeiro?: Barbeiro | null;
  onSave: (barbeiro: Barbeiro) => void;
}

export function ModalBarbeiro({
  open,
  onOpenChange,
  barbeiro,
  onSave,
}: BarbeiroFormDialogProps) {
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
    // Defer state updates to the next tick to avoid synchronous setState in effect
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.horarioTrabalho) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    // Generate email and password if not provided
    const generateEmail = (nome: string) => {
      return nome.toLowerCase().replace(/\s+/g, ".") + "@barbearia.com";
    };

    const barbeiroData: Barbeiro = {
      id: barbeiro?.id || Math.random().toString(36).substr(2, 9),
      nome: formData.nome!,
      foto:
        formData.foto ||
        "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 70),
      horarioTrabalho: formData.horarioTrabalho!,
      status: formData.status as "ativo" | "inativo",
      servicos: formData.servicos || [],
      email: formData.email || generateEmail(formData.nome!),
      password: formData.password || "barbeiro123",
    };

    onSave(barbeiroData);
    onOpenChange(false);
    toast.success(barbeiro ? "Barbeiro atualizado!" : "Barbeiro cadastrado!");
  };

  return (
    <div className="bg-slate-700">
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
              <Label htmlFor="nome">E-mail *</Label>
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
              <Label htmlFor="nome">WhatsApp *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                placeholder="Nome completo"
              />
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="foto">URL da Foto</Label>
              <Input
                id="foto"
                value={formData.foto}
                onChange={(e) =>
                  setFormData({ ...formData, foto: e.target.value })
                }
                placeholder="https://..."
              />
            </div> */}

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
              >
                Cancelar
              </Button>
              <Button type="submit" className="gradient-primary">
                {barbeiro ? "Salvar" : "Cadastrar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
