"use client";

import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { servicos } from '@/lib/mockData';
import { Plus, Edit, Trash2, Clock, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminServicos() {
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      
      <main className="flex-1 p-8 bg-background">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Serviços</h1>
            <p className="text-muted-foreground">Gerencie os serviços oferecidos</p>
          </div>
          <Button 
            className="gradient-primary shadow-glow"
            onClick={() => toast.info('Funcionalidade em desenvolvimento')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Serviço
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicos.map((servico) => (
            <Card key={servico.id} className="p-6 shadow-card hover:shadow-glow transition-all">
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
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
