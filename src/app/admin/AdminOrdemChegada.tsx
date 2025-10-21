"use client";

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { filaEspera } from '@/lib/mockData';
import { Plus, CheckCircle, Trash2, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminOrdemChegada() {
  const [fila, setFila] = useState(filaEspera);
  const [novoCliente, setNovoCliente] = useState('');

  const handleAdicionar = () => {
    if (!novoCliente.trim()) {
      toast.error('Digite o nome do cliente');
      return;
    }

    const novo = {
      id: (fila.length + 1).toString(),
      clienteNome: novoCliente,
      horarioChegada: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'aguardando' as const
    };

    setFila([...fila, novo]);
    setNovoCliente('');
    toast.success('Cliente adicionado à fila!');
  };

  const handleMarcarAtendido = (id: string) => {
    setFila(fila.map(f => f.id === id ? { ...f, status: 'atendido' as const } : f));
    toast.success('Cliente marcado como atendido!');
  };

  const handleRemover = (id: string) => {
    setFila(fila.filter(f => f.id !== id));
    toast.success('Cliente removido da fila');
  };

  const filaAtiva = fila.filter(f => f.status === 'aguardando');

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 bg-background pt-20 lg:pt-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Ordem de Chegada</h1>
          <p className="text-muted-foreground">Gerencie a fila de espera</p>
        </div>

        {/* Adicionar Cliente */}
        <Card className="p-4 lg:p-6 shadow-card mb-4 lg:mb-6">
          <h2 className="text-lg lg:text-xl font-bold mb-4">Adicionar Cliente na Fila</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Label htmlFor="nomeCliente">Nome do Cliente</Label>
              <Input
                id="nomeCliente"
                placeholder="Digite o nome do cliente"
                value={novoCliente}
                onChange={(e) => setNovoCliente(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdicionar()}
                className="h-11"
              />
            </div>
            <div className="flex sm:items-end">
              <Button 
                onClick={handleAdicionar} 
                className="gradient-primary shadow-glow w-full sm:w-auto min-h-[44px]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar
              </Button>
            </div>
          </div>
        </Card>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-4 lg:mb-6">
          <Card className="p-6 shadow-card">
            <p className="text-sm text-muted-foreground mb-1">Clientes na Fila</p>
            <p className="text-3xl font-bold text-primary">{filaAtiva.length}</p>
          </Card>
          <Card className="p-6 shadow-card">
            <p className="text-sm text-muted-foreground mb-1">Tempo Médio de Espera</p>
            <p className="text-3xl font-bold">~25 min</p>
          </Card>
          <Card className="p-6 shadow-card">
            <p className="text-sm text-muted-foreground mb-1">Atendidos Hoje</p>
            <p className="text-3xl font-bold">{fila.filter(f => f.status === 'atendido').length}</p>
          </Card>
        </div>

        {/* Lista de Espera */}
        <Card className="shadow-card">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold">Fila de Espera</h2>
          </div>
          <div className="divide-y divide-border">
            {filaAtiva.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                Nenhum cliente na fila no momento
              </div>
            ) : (
              filaAtiva.map((cliente, index) => (
                <div key={cliente.id} className="p-4 lg:p-6 hover:bg-secondary/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <div className="h-10 w-10 lg:h-12 lg:w-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center font-bold text-lg lg:text-xl text-primary">
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-base lg:text-lg truncate">{cliente.clienteNome}</h3>
                        <p className="text-xs lg:text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Chegou às {cliente.horarioChegada}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <Button 
                        variant="outline"
                        onClick={() => handleMarcarAtendido(cliente.id)}
                        className="w-full sm:w-auto min-h-[44px] justify-center"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        <span className="sm:inline">Atendido</span>
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleRemover(cliente.id)}
                        className="w-full sm:w-auto min-h-[44px] justify-center"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span className="sm:inline">Remover</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
