"'use client';";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { barbeiros } from "@/lib/mockData";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import Image from "next/image";

export default function BarbeiroPerfil() {
  const router = useRouter();
  const { user } = useAuth();

  const barbeiro = barbeiros.find((b) => b.id === user?.barbeiroId);

  const handleSave = () => {
    toast.success("Perfil atualizado com sucesso!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src={logo} alt="BarberPro" className="h-10 w-10" />
              <div>
                <h1 className="font-bold text-lg">BarberPro</h1>
                <p className="text-xs text-muted-foreground">Meu Perfil</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push("/barbeiro/agenda")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Meu Perfil</h2>
            <p className="text-muted-foreground">Gerencie suas informações</p>
          </div>

          <Card className="p-8 shadow-card">
            <div className="flex items-center gap-4 mb-8">
              <Image
                src={barbeiro?.foto ?? "/default-avatar.png"} 
                alt={barbeiro?.nome ?? "Barbeiro"}
                className="h-20 w-20 rounded-full"
              />
              <div>
                <h3 className="font-bold text-xl">{barbeiro?.nome}</h3>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  defaultValue={barbeiro?.nome}
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="horario">Horário de Trabalho</Label>
                <Input
                  id="horario"
                  defaultValue={barbeiro?.horarioTrabalho}
                  placeholder="Ex: 09:00 - 18:00"
                />
              </div>

              <div className="space-y-2">
                <Label>Serviços que Realiza</Label>
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    {barbeiro?.servicos.length} serviços cadastrados
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    (Configuração completa disponível no painel administrativo)
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSave}
                className="w-full gradient-primary shadow-glow"
                size="lg"
              >
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
