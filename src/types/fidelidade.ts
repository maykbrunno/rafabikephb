export interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  adesivos: number;
}

export interface ConfiguracoesFidelidade {
  metaAdesivos: number;
}
