"use client";

import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card } from '@/components/ui/card';
import { clientes } from '@/lib/mockData';
import { Phone, Calendar, TrendingUp } from 'lucide-react';

export default function AdminClientes() {
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      
      <main className="flex-1 p-8 bg-background">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Clientes</h1>
          <p className="text-muted-foreground">Histórico de clientes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientes.map((cliente) => (
            <Card key={cliente.id} className="p-6 shadow-card">
              <div className="mb-4">
                <h3 className="font-bold text-xl mb-2">{cliente.nome}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    {cliente.telefone}
                  </p>
                  {cliente.ultimoAtendimento && (
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Último: {new Date(cliente.ultimoAtendimento).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                  <p className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    {cliente.totalAtendimentos} atendimentos
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
