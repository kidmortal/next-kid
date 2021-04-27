// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { RequestOmie } from "../../_request";

export interface Nota {
  compl: Compl;
  det?: DetEntity[] | null;
  ide: Ide;
  info: Info;
  nfDestInt: NfDestInt;
  nfEmitInt: NfEmitInt;
  pedido: RastreabilidadeOrPedido;
  titulos?: TitulosEntity[] | null;
  total: Total;
}
export interface Compl {
  cChaveNFe: string;
  cCodCateg: string;
  cModFrete: string;
  nIdNF: number;
  nIdPedido: number;
  nIdReceb: number;
  nIdTransp: number;
}
export interface DetEntity {
  nfProdInt: NfProdInt;
  prod: Prod;
  rastreabilidade: RastreabilidadeOrPedido;
}
export interface NfProdInt {
  cCodItemInt: string;
  cCodProdInt: string;
  nCodItem: number;
  nCodProd: number;
}
export interface Prod {
  CFOP: string;
  EXTIPI: string;
  NCM: string;
  cEAN: string;
  cEANTrib: string;
  cProd: string;
  cProdOrig: string;
  indTot: string;
  nCMCTotal: number;
  nCMCUnitario: number;
  pICMSST: number;
  qCom: number;
  qTrib: number;
  uCom: string;
  uTrib: string;
  vDesc: number;
  vFrete: number;
  vICMSST: number;
  vOutro: number;
  vProd: number;
  vSeg: number;
  vTotItem: number;
  vUnCom: number;
  vUnTrib: number;
  xProd: string;
  xProdOrig: string;
}
export interface RastreabilidadeOrPedido {}
export interface Ide {
  dCan: string;
  dEmi: string;
  dInut: string;
  dReg: string;
  dSaiEnt: string;
  finNFe: string;
  hEmi: string;
  hSaiEnt: string;
  indPag: string;
  mod: string;
  nNF: string;
  serie: string;
  tpAmb: string;
  tpNF: string;
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
export interface NfDestInt {
  cCodCliInt: string;
  nCodCli: number;
}
export interface NfEmitInt {
  cCodEmpInt: string;
  nCodEmp: number;
}
export interface TitulosEntity {
  cCodCateg: string;
  cCodIntTitulo: string;
  cNumTitulo: string;
  dDtEmissao: string;
  dDtPrevisao: string;
  dDtVenc: string;
  dReg: string;
  nCodComprador: number;
  nCodProjeto: number;
  nCodTitRepet: number;
  nCodTitulo: number;
  nCodVendedor: number;
  nParcela: number;
  nTotParc: number;
  nValorTitulo: number;
}
export interface Total {
  ICMSTot: ICMSTot;
  ISSQNtot: ISSQNtot;
  retTrib: RetTrib;
}
export interface ICMSTot {
  vBC: number;
  vBCST: number;
  vCOFINS: number;
  vDesc: number;
  vFrete: number;
  vICMS: number;
  vICMSDesonerado: number;
  vII: number;
  vIPI: number;
  vNF: number;
  vOutro: number;
  vPIS: number;
  vProd: number;
  vST: number;
  vSeg: number;
  vTotTrib: number;
}
export interface ISSQNtot {
  vBC: number;
  vCOFINS: number;
  vISS: number;
  vPIS: number;
  vServ: number;
}
export interface RetTrib {
  vBCIRRF: number;
  vBCRetPrev: number;
  vIRRF: number;
  vRetCOFINS: number;
  vRetCSLL: number;
  vRetPIS: number;
  vRetPrev: number;
}

export interface Result {
  result: {
    nfCadastro: Nota[];
    pagina: number;
    registros: number;
    total_de_paginas: number;
    total_de_registros: number;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let nota = req.query.nota as string;
  if (!nota)
    return res
      .status(200)
      .json({ message: "No NF provided, examle nota=00022293" });

  res.status(200).json(await GetOneNfByNumero(nota));
};

export async function GetOneNfByNumero(nota: string) {
  const result: Nota = await RequestOmie({
    call: "ConsultarNF",
    path: "produtos/nfconsultar/",
    param: {
      nNF: nota,
    },
  });
  return result;
}
