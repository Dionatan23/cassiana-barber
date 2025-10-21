"use client";

import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card } from '@/components/ui/card';
import { Calendar, Users, TrendingUp, Clock } from 'lucide-react';
import { agendamentos, barbeiros } from '@/lib/mockData';
import Image from 'next/image';

export default function AdminDashboard() {
  const agendamentosHoje = agendamentos.filter(
    a => a.data === new Date().toISOString().split('T')[0]
  );

  const barbeiroMaisAtendimentos = barbeiros[0];

  const proximosAgendamentos = agendamentos
    .filter(a => a.status === 'aguardando')
    .slice(0, 5);

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 bg-background pt-20 lg:pt-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do sistema</p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Agendamentos Hoje</p>
                <p className="text-3xl font-bold">{agendamentosHoje.length}</p>
              </div>
              <Calendar className="h-10 w-10 text-primary" />
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Barbeiros Ativos</p>
                <p className="text-3xl font-bold">{barbeiros.filter(b => b.status === 'ativo').length}</p>
              </div>
              <Users className="h-10 w-10 text-primary" />
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Em Atendimento</p>
                <p className="text-3xl font-bold">
                  {agendamentos.filter(a => a.status === 'em-atendimento').length}
                </p>
              </div>
              <Clock className="h-10 w-10 text-primary" />
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Mês</p>
                <p className="text-3xl font-bold">{agendamentos.length}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-primary" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Barbeiro Destaque */}
          <Card className="p-6 shadow-card">
            <h2 className="text-xl font-bold mb-4">Barbeiro do Mês</h2>
            <div className="flex items-center gap-4">
              <Image 
                src={barbeiroMaisAtendimentos.foto} 
                alt={barbeiroMaisAtendimentos.nome}
                className="h-16 w-16 rounded-full"
              />
              <div>
                <p className="font-bold text-lg">{barbeiroMaisAtendimentos.nome}</p>
                <p className="text-sm text-muted-foreground">
                  Horário: {barbeiroMaisAtendimentos.horarioTrabalho}
                </p>
                <p className="text-primary font-semibold mt-1">
                  Mais atendimentos do mês
                </p>
              </div>
            </div>
          </Card>

          {/* Próximos Agendamentos */}
          <Card className="p-6 shadow-card">
            <h2 className="text-xl font-bold mb-4">Próximos Agendamentos</h2>
            <div className="space-y-3">
              {proximosAgendamentos.map((agendamento) => {
                const barbeiro = barbeiros.find(b => b.id === agendamento.barbeiroId);
                return (
                  <div key={agendamento.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div>
                      <p className="font-semibold">{agendamento.clienteNome}</p>
                      <p className="text-sm text-muted-foreground">{barbeiro?.nome}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{agendamento.horario}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(agendamento.data + 'T00:00').toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
