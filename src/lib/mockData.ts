// Mock data para simulação do sistema

export interface Barbeiro {
  id: string;
  name: string;
  email: string;
  password?: string;
  foto: string;
  horarioTrabalho: string;
  status: 'ativo' | 'inativo';
  servicos: string[];
}

export interface Servico {
  id: string;
  name: string;
  preco: number;
  duracao: number; // em minutos
  icone: string;
}

export interface Agendamento {
  id: string;
  clientename: string;
  clienteTelefone: string;
  barbeiroId: string;
  servicoId: string;
  data: string;
  horario: string;
  status: 'aguardando' | 'em-atendimento' | 'finalizado' | 'cancelado';
}

export interface Cliente {
  id: string;
  name: string;
  telefone: string;
  ultimoAtendimento?: string;
  totalAtendimentos: number;
}

export interface FilaEspera {
  id: string;
  clientename: string;
  horarioChegada: string;
  status: 'aguardando' | 'atendido';
}

// Dados iniciais
export const servicos: Servico[] = [
  {
    id: '1',
    name: 'Corte Simples',
    preco: 35,
    duracao: 30,
    icone: 'Scissors'
  },
  {
    id: '2',
    name: 'Corte + Barba',
    preco: 55,
    duracao: 45,
    icone: 'Razor'
  },
  {
    id: '3',
    name: 'Barba',
    preco: 25,
    duracao: 20,
    icone: 'Sparkles'
  },
  {
    id: '4',
    name: 'Corte + Barba + Sobrancelha',
    preco: 70,
    duracao: 60,
    icone: 'Star'
  },
  {
    id: '5',
    name: 'Pigmentação',
    preco: 45,
    duracao: 40,
    icone: 'Brush'
  }
];

export const agendamentos: Agendamento[] = [
  {
    id: '1',
    clientename: 'Ricardo Alves',
    clienteTelefone: '(11) 98765-4321',
    barbeiroId: '1',
    servicoId: '2',
    data: new Date().toISOString().split('T')[0],
    horario: '10:00',
    status: 'aguardando'
  },
  {
    id: '2',
    clientename: 'Marcos Costa',
    clienteTelefone: '(11) 97654-3210',
    barbeiroId: '2',
    servicoId: '1',
    data: new Date().toISOString().split('T')[0],
    horario: '11:00',
    status: 'aguardando'
  },
  {
    id: '3',
    clientename: 'André Lima',
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
    name: 'Ricardo Alves',
    telefone: '(11) 98765-4321',
    ultimoAtendimento: '2025-10-10',
    totalAtendimentos: 5
  },
  {
    id: '2',
    name: 'Marcos Costa',
    telefone: '(11) 97654-3210',
    ultimoAtendimento: '2025-10-08',
    totalAtendimentos: 3
  },
  {
    id: '3',
    name: 'André Lima',
    telefone: '(11) 96543-2109',
    ultimoAtendimento: '2025-10-14',
    totalAtendimentos: 8
  }
];

export const filaEspera: FilaEspera[] = [
  {
    id: '1',
    clientename: 'Paulo Ferreira',
    horarioChegada: '10:30',
    status: 'aguardando'
  },
  {
    id: '2',
    clientename: 'Gabriel Souza',
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
