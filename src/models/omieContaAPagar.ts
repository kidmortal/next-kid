export interface Categoria {
  codigo_categoria: string;
  percentual: number;
  valor: number;
}

export interface CnabIntegracaoBancaria {
  codigo_barras_boleto: string;
  codigo_forma_pagamento: string;
  juros_boleto: number;
  multa_boleto: number;
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

export interface ContaPagarCadastro {
  categorias: Categoria[];
  chave_nfe: string;
  cnab_integracao_bancaria: CnabIntegracaoBancaria;
  codigo_barras_ficha_compensacao: string;
  codigo_categoria: string;
  codigo_cliente_fornecedor: number;
  codigo_lancamento_integracao: string;
  codigo_lancamento_omie: number;
  codigo_tipo_documento: string;
  data_emissao: string;
  data_entrada: string;
  data_previsao: string;
  data_vencimento: string;
  distribuicao: any[];
  id_conta_corrente: number;
  id_origem: string;
  info: Info;
  numero_documento: string;
  numero_documento_fiscal: string;
  numero_parcela: string;
  observacao: string;
  operacao: string;
  status_titulo: string;
  valor_documento: number;
  baixa_bloqueada: string;
  bloqueado: string;
  retem_cofins: string;
  retem_csll: string;
  retem_inss: string;
  retem_ir: string;
  retem_iss: string;
  retem_pis: string;
}

export interface ListaContaAPagarRetorno {
  pagina: number;
  total_de_paginas: number;
  registros: number;
  total_de_registros: number;
  conta_pagar_cadastro: ContaPagarCadastro[];
}
