// Mock data para simulação do sistema

export interface Barbeiro {
  id: string;
  nome: string;
  foto: string;
  horarioTrabalho: string;
  status: 'ativo' | 'inativo';
  servicos: string[];
}

export interface Servico {
  id: string;
  nome: string;
  preco: number;
  duracao: number; // em minutos
  icone: string;
}

export interface Agendamento {
  id: string;
  clienteNome: string;
  clienteTelefone: string;
  barbeiroId: string;
  servicoId: string;
  data: string;
  horario: string;
  status: 'aguardando' | 'em-atendimento' | 'finalizado' | 'cancelado';
}

export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  ultimoAtendimento?: string;
  totalAtendimentos: number;
}

export interface FilaEspera {
  id: string;
  clienteNome: string;
  horarioChegada: string;
  status: 'aguardando' | 'atendido';
}

// Dados iniciais
export const barbeiros: Barbeiro[] = [
  {
    id: '1',
    nome: 'João Silva',
    foto: 'https://i.pravatar.cc/150?img=12',
    horarioTrabalho: '09:00 - 18:00',
    status: 'ativo',
    servicos: ['1', '2', '3', '4']
  },
  {
    id: '2',
    nome: 'Pedro Santos',
    foto: 'https://i.pravatar.cc/150?img=13',
    horarioTrabalho: '10:00 - 19:00',
    status: 'ativo',
    servicos: ['1', '2', '3']
  },
  {
    id: '3',
    nome: 'Carlos Mendes',
    foto: 'https://i.pravatar.cc/150?img=14',
    horarioTrabalho: '09:00 - 17:00',
    status: 'ativo',
    servicos: ['1', '2', '4', '5']
  }
];

export const servicos: Servico[] = [
  {
    id: '1',
    nome: 'Corte Simples',
    preco: 35,
    duracao: 30,
    icone: 'Scissors'
  },
  {
    id: '2',
    nome: 'Corte + Barba',
    preco: 55,
    duracao: 45,
    icone: 'Razor'
  },
  {
    id: '3',
    nome: 'Barba',
    preco: 25,
    duracao: 20,
    icone: 'Sparkles'
  },
  {
    id: '4',
    nome: 'Corte + Barba + Sobrancelha',
    preco: 70,
    duracao: 60,
    icone: 'Star'
  },
  {
    id: '5',
    nome: 'Pigmentação',
    preco: 45,
    duracao: 40,
    icone: 'Brush'
  }
];

export const agendamentos: Agendamento[] = [
  {
    id: '1',
    clienteNome: 'Ricardo Alves',
    clienteTelefone: '(11) 98765-4321',
    barbeiroId: '1',
    servicoId: '2',
    data: new Date().toISOString().split('T')[0],
    horario: '10:00',
    status: 'aguardando'
  },
  {
    id: '2',
    clienteNome: 'Marcos Costa',
    clienteTelefone: '(11) 97654-3210',
    barbeiroId: '2',
    servicoId: '1',
    data: new Date().toISOString().split('T')[0],
    horario: '11:00',
    status: 'aguardando'
  },
  {
    id: '3',
    clienteNome: 'André Lima',
    clienteTelefone: '(11) 96543-2109',
    barbeiroId: '1',
    servicoId: '4',
    data: new Date().toISOString().split('T')[0],
    horario: '14:00',
    status: 'em-atendimento'
  }
];

export const clientes: Cliente[] = [
  {
    id: '1',
    nome: 'Ricardo Alves',
    telefone: '(11) 98765-4321',
    ultimoAtendimento: '2025-10-10',
    totalAtendimentos: 5
  },
  {
    id: '2',
    nome: 'Marcos Costa',
    telefone: '(11) 97654-3210',
    ultimoAtendimento: '2025-10-08',
    totalAtendimentos: 3
  },
  {
    id: '3',
    nome: 'André Lima',
    telefone: '(11) 96543-2109',
    ultimoAtendimento: '2025-10-14',
    totalAtendimentos: 8
  }
];

export const filaEspera: FilaEspera[] = [
  {
    id: '1',
    clienteNome: 'Paulo Ferreira',
    horarioChegada: '10:30',
    status: 'aguardando'
  },
  {
    id: '2',
    clienteNome: 'Gabriel Souza',
    horarioChegada: '11:15',
    status: 'aguardando'
  }
];

// Horários disponíveis para agendamento
export const horariosDisponiveis = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00'
];
