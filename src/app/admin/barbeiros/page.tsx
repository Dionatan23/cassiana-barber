"use client";

import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { barbeiros } from '@/lib/mockData';
import { Plus, Edit, Calendar } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminBarbeiros() {
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
            onClick={() => toast.info('Funcionalidade em desenvolvimento')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Barbeiro
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {barbeiros.map((barbeiro) => (
            <Card key={barbeiro.id} className="p-6 shadow-card">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{barbeiro.nome}</h3>
                  <Badge className={
                    barbeiro.status === 'ativo' 
                      ? 'bg-success/20 text-success' 
                      : 'bg-muted text-muted-foreground'
                  }>
                    {barbeiro.status === 'ativo' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Horário:</strong> {barbeiro.horarioTrabalho}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Serviços:</strong> {barbeiro.servicos.length} cadastrados
                </p>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => toast.info('Funcionalidade em desenvolvimento')}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => toast.info('Funcionalidade em desenvolvimento')}
                >
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
