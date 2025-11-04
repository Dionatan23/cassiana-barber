"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2, Clock, DollarSign } from "lucide-react";
import { ModalAddServico } from "../components/modalAddServico";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface ServicoGlobalProps {
  id: string;
  nome: string;
  preco: number;
  duracao: number;
}

export default function AdminServicos() {
  const [openServicos, setOpenServicos] = useState(false);
  const [selectedServico, setSelectedServico] =
    useState<ServicoGlobalProps | null>(null);
  const [servicos, setServicos] = useState<ServicoGlobalProps[]>([]);

  const handleAddServicoOpen = () => setOpenServicos(true);
  const handleEdit = (servico: ServicoGlobalProps) => {
    setSelectedServico(servico);
    console.log(servico);
    setOpenServicos(true);
  };

  const handleDeleteServico = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esse serviço?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/servico/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao excluir serviços.");
      }
      await fetchServicos();
      toast.success("Serviço excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir serviços:", error);
    }
  };

  const fetchServicos = async () => {
    try {
      const response = await fetch("/api/admin/servico");
      if (!response.ok) {
        throw new Error("Erro ao buscar serviços.");
      }
      const data = await response.json();
      setServicos(data);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />

      <main className="flex-1 p-8 bg-background">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Serviços</h1>
            <p className="text-muted-foreground">
              Gerencie os serviços oferecidos
            </p>
          </div>
          <Button
            className="gradient-primary shadow-glow cursor-pointer"
            onClick={handleAddServicoOpen}
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Serviço
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicos.map((servico) => (
            <Card
              key={servico.id}
              className="p-6 shadow-card hover:shadow-glow transition-all"
            >
              <div className="mb-4">
                <h3 className="font-bold text-xl mb-2">{servico.nome}</h3>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1 text-sm">
                    <Clock className="h-4 w-4" />
                    {servico.duracao} min
                  </span>
                  <span className="flex items-center gap-1 text-lg font-bold text-primary">
                    <DollarSign className="h-5 w-5" />
                    {servico.preco.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 cursor-pointer"
                  onClick={() => handleEdit(servico)}
                >
                  <Edit className="mr-2 h-4 w-4 cursor-pointer" />
                  Editar
                </Button>
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  onClick={() => handleDeleteServico(servico.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <ModalAddServico
          onSuccess={fetchServicos}
          servico={selectedServico}
          open={openServicos}
          onOpenChange={setOpenServicos}
        />
      </main>
    </div>
  );
}
