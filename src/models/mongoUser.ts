export interface Notificar {
  SEPARADO: string[];
  RELATORIO_DIARIO: boolean;
  DATA_INCORRETA: boolean;
  SEM_CONDICAO: boolean;
  CLIENTE_COM_PENDENCIA: boolean;
  ERRO_SUSPEITO: boolean;
}

export interface Apps {
  BAIXAR_CONTAS: boolean;
  NOTIFICACOES: boolean;
  CHEQUE_DEVOLVIDO: boolean;
  FUNCOES_ADMINISTRATIVAS: boolean;
  RELATORIO_FINANCEIRO: boolean;
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
  empresa?: string;
  callmebotKey?: string;
  pedidos_pre_autorizados: string[];
  __v?: number;
}
