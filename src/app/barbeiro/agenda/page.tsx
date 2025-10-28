"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { agendamentos, servicos } from '@/lib/mockData';
import { LogOut, User, Clock, CheckCircle, Play } from 'lucide-react';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';
import Image from 'next/image';

export default function BarbeiroAgenda() {
  const router = useRouter();
    const user = {
      id: 1,
      name: 'John Doe',
      email: '2m1eP@example.com',
      role: 'BARBEIRO',
      barbeiroId: 1,    
    };
  
  const meusAgendamentos = agendamentos.filter(a => Number(a.barbeiroId) === user?.barbeiroId);
  const [lista, setLista] = useState(meusAgendamentos);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      'aguardando': { label: 'Aguardando', className: 'bg-warning/20 text-warning' },
      'em-atendimento': { label: 'Em Atendimento', className: 'bg-info/20 text-info' },
      'finalizado': { label: 'Finalizado', className: 'bg-success/20 text-success' }
    };
    const variant = variants[status] || variants.aguardando;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const handleIniciarAtendimento = (id: string) => {
    setLista(lista.map(a => a.id === id ? { ...a, status: 'em-atendimento' as const } : a));
    toast.success('Atendimento iniciado!');
  };

  const handleFinalizar = (id: string) => {
    setLista(lista.map(a => a.id === id ? { ...a, status: 'finalizado' as const } : a));
    toast.success('Atendimento finalizado!');
  };

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src={logo} alt="BarberPro" className="h-8 w-8 lg:h-10 lg:w-10" />
              <div>
                <h1 className="font-bold text-base lg:text-lg">BarberPro</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Minha Agenda</p>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push('/barbeiro/perfil')}
                className="hidden sm:flex"
              >
                <User className="mr-2 h-4 w-4" />
                {user?.name}
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => router.push('/barbeiro/perfil')}
                className="sm:hidden"
              >
                <User className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="hidden sm:flex"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleLogout}
                className="sm:hidden"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 lg:py-8">
        <div className="mb-6 lg:mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">Minha Agenda</h2>
          <p className="text-muted-foreground text-sm lg:text-base">
            {lista.filter(a => a.data === new Date().toISOString().split('T')[0]).length} agendamentos hoje
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="p-6 shadow-card">
            <p className="text-sm text-muted-foreground mb-1">Aguardando</p>
            <p className="text-3xl font-bold text-warning">
              {lista.filter(a => a.status === 'aguardando').length}
            </p>
          </Card>
          <Card className="p-6 shadow-card">
            <p className="text-sm text-muted-foreground mb-1">Em Atendimento</p>
            <p className="text-3xl font-bold text-info">
              {lista.filter(a => a.status === 'em-atendimento').length}
            </p>
          </Card>
          <Card className="p-6 shadow-card">
            <p className="text-sm text-muted-foreground mb-1">Finalizados Hoje</p>
            <p className="text-3xl font-bold text-success">
              {lista.filter(a => a.status === 'finalizado').length}
            </p>
          </Card>
        </div>

        {/* Lista de Agendamentos */}
        <div className="space-y-4">
          {lista.length === 0 ? (
            <Card className="p-12 text-center shadow-card">
              <p className="text-muted-foreground text-lg">
                Nenhum agendamento no momento
              </p>
            </Card>
          ) : (
            lista.map((agendamento) => {
              const servico = servicos.find(s => s.id === agendamento.servicoId);
              
              return (
                <Card key={agendamento.id} className="p-4 lg:p-6 shadow-card">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="text-center shrink-0">
                        <div className="text-2xl lg:text-3xl font-bold text-primary">{agendamento.horario}</div>
                        <div className="text-xs lg:text-sm text-muted-foreground">
                          {new Date(agendamento.data + 'T00:00').toLocaleDateString('pt-BR', { 
                            day: '2-digit', 
                            month: 'short' 
                          })}
                        </div>
                      </div>
                      
                      <div className="h-auto lg:h-12 w-px bg-border hidden lg:block" />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg lg:text-xl mb-1">{agendamento.clientename}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{agendamento.clienteTelefone}</p>
                        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                          <span className="text-sm font-medium">{servico?.name}</span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {servico?.duracao} min
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 lg:gap-3">
                      <div className="sm:order-1">
                        {getStatusBadge(agendamento.status)}
                      </div>
                      
                      {agendamento.status === 'aguardando' && (
                        <Button 
                          onClick={() => handleIniciarAtendimento(agendamento.id)}
                          className="gradient-primary w-full sm:w-auto min-h-[44px]"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Iniciar
                        </Button>
                      )}
                      
                      {agendamento.status === 'em-atendimento' && (
                        <Button 
                          onClick={() => handleFinalizar(agendamento.id)}
                          className="bg-success hover:bg-success/90 w-full sm:w-auto min-h-[44px]"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Finalizar
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
