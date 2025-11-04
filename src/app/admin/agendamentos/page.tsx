"use client";

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { agendamentos, barbeiros, servicos } from '@/lib/mockData';
import { Edit, Trash2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminAgendamentos() {
  const [lista, setLista] = useState(agendamentos);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      'aguardando': { label: 'Aguardando', className: 'bg-warning/20 text-warning' },
      'em-atendimento': { label: 'Em Atendimento', className: 'bg-info/20 text-info' },
      'finalizado': { label: 'Finalizado', className: 'bg-success/20 text-success' },
      'cancelado': { label: 'Cancelado', className: 'bg-destructive/20 text-destructive' }
    };
    const variant = variants[status] || variants.aguardando;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const handleFinalizar = (id: string) => {
    setLista(lista.map(a => a.id === id ? { ...a, status: 'finalizado' as const } : a));
    toast.success('Agendamento finalizado com sucesso!');
  };

  const handleCancelar = (id: string) => {
    setLista(lista.map(a => a.id === id ? { ...a, status: 'cancelado' as const } : a));
    toast.success('Agendamento cancelado');
  };

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 bg-background pt-20 lg:pt-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Agendamentos</h1>
          <p className="text-muted-foreground">Gerencie todos os agendamentos</p>
        </div>

        {/* Tabela Desktop */}
        <Card className="shadow-card hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="text-left p-4">Cliente</th>
                  <th className="text-left p-4">Telefone</th>
                  <th className="text-left p-4">Barbeiro</th>
                  <th className="text-left p-4">Serviço</th>
                  <th className="text-left p-4">Data</th>
                  <th className="text-left p-4">Horário</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((agendamento) => {
                  const barbeiro = barbeiros.find(b => b.id === agendamento.barbeiroId);
                  const servico = servicos.find(s => s.id === agendamento.servicoId);
                  
                  return (
                    <tr key={agendamento.id} className="border-b border-border hover:bg-secondary/50">
                      <td className="p-4 font-medium">{agendamento.clientename}</td>
                      <td className="p-4 text-sm text-muted-foreground">{agendamento.clienteTelefone}</td>
                      <td className="p-4">{barbeiro?.name}</td>
                      <td className="p-4">{servico?.name}</td>
                      <td className="p-4">
                        {new Date(agendamento.data + 'T00:00').toLocaleDateString('pt-BR')}
                      </td>
                      <td className="p-4 font-semibold text-primary">{agendamento.horario}</td>
                      <td className="p-4">{getStatusBadge(agendamento.status)}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          {agendamento.status === 'aguardando' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleFinalizar(agendamento.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleCancelar(agendamento.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Cards Mobile */}
        <div className="lg:hidden space-y-4">
          {lista.map((agendamento) => {
            const barbeiro = barbeiros.find(b => b.id === agendamento.barbeiroId);
            const servico = servicos.find(s => s.id === agendamento.servicoId);
            
            return (
              <Card key={agendamento.id} className="p-4 shadow-card">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg mb-1">{agendamento.clientename}</h3>
                      <p className="text-sm text-muted-foreground">{agendamento.clienteTelefone}</p>
                    </div>
                    {getStatusBadge(agendamento.status)}
                  </div>
                  
                  <div className="h-px bg-border" />
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Barbeiro</p>
                      <p className="font-medium">{barbeiro?.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Serviço</p>
                      <p className="font-medium">{servico?.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Data</p>
                      <p className="font-medium">
                        {new Date(agendamento.data + 'T00:00').toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Horário</p>
                      <p className="font-bold text-primary">{agendamento.horario}</p>
                    </div>
                  </div>

                  {agendamento.status === 'aguardando' && (
                    <>
                      <div className="h-px bg-border" />
                      <div className="flex flex-col gap-2">
                        <Button 
                          variant="outline"
                          onClick={() => handleFinalizar(agendamento.id)}
                          className="w-full min-h-[44px]"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Finalizar
                        </Button>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline"
                            className="flex-1 min-h-[44px]"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => handleCancelar(agendamento.id)}
                            className="flex-1 min-h-[44px]"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
