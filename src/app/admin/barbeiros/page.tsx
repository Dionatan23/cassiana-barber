/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Info, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { ModalBarbeiro } from "../components/modalBarbeiro";
import { ModalInfoBarbeiros } from "../components/modalInfoBarbeiros";
import { useBarbeiros } from "@/hooks/useBarbeiros";

export default function AdminBarbeiros() {
  const { barbeiros, loading, refetch } = useBarbeiros();
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedBarbeiro, setSelectedBarbeiro] = useState<any>(null);

  const handleAddBarbeiro = () => {
    setSelectedBarbeiro(null);
    setFormDialogOpen(true);
  };

  const handleOpenInfo = (barbeiro: any) => {
    setSelectedBarbeiro(barbeiro);
    setInfoModalOpen(true);
  };

  const handleEditBarbeiro = (barbeiro: any) => {
    setSelectedBarbeiro(barbeiro);
    setFormDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-background">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Barbeiros</h1>
            <p className="text-muted-foreground">Gerencie sua equipe</p>
          </div>
          <Button
            className="gradient-primary shadow-glow"
            onClick={handleAddBarbeiro}
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Barbeiro
          </Button>
        </div>

        {loading ? (
          <p>Carregando barbeiros...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {barbeiros.map((barbeiro) => (
              <Card key={barbeiro.id} className="p-6 shadow-card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{barbeiro.name}</h3>
                    <Badge
                      className={
                        barbeiro.barbeiroInfo.status === "ativo"
                          ? "bg-success/20 text-success"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {barbeiro.barbeiroInfo.status === "ativo"
                        ? "Ativo"
                        : "Inativo"}
                    </Badge>
                  </div>
                  <Button
                    className="cursor-pointer"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenInfo(barbeiro)}
                  >
                    <Info className="h-6 w-6" />
                  </Button>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Horário:</strong>{" "}
                    {barbeiro.barbeiroInfo.horarioTrabalho || "—"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>E-mail:</strong> {barbeiro.email}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleEditBarbeiro(barbeiro)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast.info("Funcionalidade em desenvolvimento")
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <ModalBarbeiro
          open={formDialogOpen}
          onOpenChange={setFormDialogOpen}
          barbeiro={selectedBarbeiro}
          onSuccess={refetch}
        />

        <ModalInfoBarbeiros
          open={infoModalOpen}
          onOpenChange={setInfoModalOpen}
          barbeiro={selectedBarbeiro}
        />
      </main>
    </div>
  );
}
