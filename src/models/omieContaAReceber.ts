export interface Boleto {
  cGerado: string;
  cNumBancario: string;
  cNumBoleto: string;
  dDtEmBol: string;
  nPerJuros: number;
  nPerMulta: number;
}

export interface Categoria {
  codigo_categoria: string;
  percentual: number;
  valor: number;
}

export interface Info {
  cImpAPI: string;
  dAlt: string;
  dInc: string;
  hAlt: string;
  hInc: string;
  uAlt: string;
  uInc: string;
}

export interface ContaReceberCadastro {
  boleto: Boleto;
  categorias: Categoria[];
  chave_nfe: string;
  codigo_barras_ficha_compensacao: string;
  codigo_categoria: string;
  codigo_cliente_fornecedor: number;
  codigo_lancamento_integracao: string;
  codigo_lancamento_omie: number;
  codigo_tipo_documento: string;
  codigo_vendedor: number;
  data_emissao: string;
  data_previsao: string;
  data_registro: string;
  data_vencimento: string;
  distribuicao: any[];
  id_conta_corrente: number;
  id_origem: string;
  info: Info;
  nCodPedido: number;
  numero_documento_fiscal: string;
  numero_parcela: string;
  numero_pedido: string;
  operacao: string;
  retem_cofins: string;
  retem_csll: string;
  retem_inss: string;
  retem_ir: string;
  retem_iss: string;
  retem_pis: string;
  status_titulo: string;
  tipo_agrupamento: string;
  valor_documento: number;
  observacao: string;
}

export interface ListaContaAReceberRetorno {
  pagina: number;
  total_de_paginas: number;
  registros: number;
  total_de_registros: number;
  conta_receber_cadastro: ContaReceberCadastro[];
}
