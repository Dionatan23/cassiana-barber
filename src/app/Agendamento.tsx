"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { barbeiros, servicos, horariosDisponiveis } from '@/lib/mockData';
import { Calendar, Clock, User, Phone, CheckCircle } from 'lucide-react';

export default function Agendamento() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    barbeiroId: '',
    servicoId: '',
    data: '',
    horario: '',
    nome: '',
    telefone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.barbeiroId || !formData.servicoId || !formData.data || 
        !formData.horario || !formData.nome || !formData.telefone) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    toast.success('Seu horário foi agendado com sucesso! Te esperamos na hora marcada 😎');
    
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  const barbeiroSelecionado = barbeiros.find(b => b.id === formData.barbeiroId);
  const servicoSelecionado = servicos.find(s => s.id === formData.servicoId);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Agendar Horário</h1>
            <p className="text-muted-foreground">
              Preencha os dados abaixo para garantir seu horário
            </p>
          </div>

          <Card className="p-8 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selecionar Barbeiro */}
              <div className="space-y-2">
                <Label htmlFor="barbeiro" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Selecione o Barbeiro
                </Label>
                <Select 
                  value={formData.barbeiroId}
                  onValueChange={(value) => setFormData({ ...formData, barbeiroId: value })}
                >
                  <SelectTrigger id="barbeiro">
                    <SelectValue placeholder="Escolha um barbeiro" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {barbeiros.map((barbeiro) => (
                      <SelectItem key={barbeiro.id} value={barbeiro.id}>
                        <div className="flex items-center gap-2">
                          <img 
                            src={barbeiro.foto} 
                            alt={barbeiro.nome}
                            className="h-6 w-6 rounded-full"
                          />
                          {barbeiro.nome}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Selecionar Serviço */}
              <div className="space-y-2">
                <Label htmlFor="servico" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Selecione o Serviço
                </Label>
                <Select 
                  value={formData.servicoId}
                  onValueChange={(value) => setFormData({ ...formData, servicoId: value })}
                >
                  <SelectTrigger id="servico">
                    <SelectValue placeholder="Escolha um serviço" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {servicos.map((servico) => (
                      <SelectItem key={servico.id} value={servico.id}>
                        {servico.nome} - R$ {servico.preco.toFixed(2)} ({servico.duracao}min)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Data */}
              <div className="space-y-2">
                <Label htmlFor="data" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Data
                </Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Horário */}
              <div className="space-y-2">
                <Label htmlFor="horario" className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Horário
                </Label>
                <Select 
                  value={formData.horario}
                  onValueChange={(value) => setFormData({ ...formData, horario: value })}
                >
                  <SelectTrigger id="horario">
                    <SelectValue placeholder="Escolha um horário" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {horariosDisponiveis.map((horario) => (
                      <SelectItem key={horario} value={horario}>
                        {horario}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="nome">Seu Nome</Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="telefone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  Telefone
                </Label>
                <Input
                  id="telefone"
                  type="tel"
                  placeholder="(11) 98765-4321"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                />
              </div>

              {/* Resumo */}
              {barbeiroSelecionado && servicoSelecionado && formData.data && formData.horario && (
                <Card className="p-4 bg-primary/10 border-primary/20">
                  <h3 className="font-bold mb-3 text-primary">Resumo do Agendamento</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Barbeiro:</strong> {barbeiroSelecionado.nome}</p>
                    <p><strong>Serviço:</strong> {servicoSelecionado.nome}</p>
                    <p><strong>Data:</strong> {new Date(formData.data + 'T00:00').toLocaleDateString('pt-BR')}</p>
                    <p><strong>Horário:</strong> {formData.horario}</p>
                    <p><strong>Valor:</strong> R$ {servicoSelecionado.preco.toFixed(2)}</p>
                  </div>
                </Card>
              )}

              <Button type="submit" className="w-full gradient-primary shadow-glow" size="lg">
                Confirmar Agendamento
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
