export interface Notificar {
  SEPARADO: string[];
  RELATORIO_DIARIO: boolean;
  DATA_INCORRETA: boolean;
  SEM_CONDICAO: boolean;
}

export interface Apps {
  BAIXAR_CONTAS: boolean;
  NOTIFICACOES: boolean;
  CHEQUE_DEVOLVIDO: boolean;
  USUARIOS: boolean;
}

export interface MongoUser {
  _id?: string;
  notificacoes?: string[];
  nome?: string;
  notificar?: Notificar;
  apps?: Apps;
  celular?: string;
  email?: string;
  callmebotKey?: string;
  __v?: number;
}
