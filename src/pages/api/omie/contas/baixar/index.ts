// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GetOneNfByNumero } from "../../notas/consultar";
import { RequestOmie } from "../../_request";

type baixaResponse = {
  codigo_lancamento: number;
  codigo_lancamento_integracao: string;
  codigo_baixa: number;
  codigo_baixa_integracao: string;
  liquidado: string;
  valor_baixado: number;
  codigo_status: string;
  descricao_status: string;
  faultstring: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { dataBaixa, Cc, nota, desconto, juros } = req.body;
  if (!nota) return res.status(200).json({ message: "Nota sem numero" });

  let notaInfo, titulo, tituloNumero, valor, valorFinal;

  try {
    notaInfo = await GetOneNfByNumero(nota);
    titulo = notaInfo.titulos[0];
    tituloNumero = titulo?.nCodTitulo;
    valor = titulo?.nValorTitulo;
    valorFinal = valor - desconto + juros;
  } catch (error) {
    return console.log("erro ao processar nf " + nota);
  }

  let response: baixaResponse = await RequestOmie({
    call: "LancarRecebimento",
    path: "financas/contareceber/",
    param: {
      codigo_lancamento: tituloNumero,
      codigo_conta_corrente: Cc,
      valor: valorFinal,
      desconto: desconto,
      juros: juros,
      data: dataBaixa,
      observacao: "Ooi deiaaaaaaaaa",
    },
  });

  res
    .status(200)
    .json(
      `NF: ${parseInt(nota)} - ${
        response.descricao_status
          ? response.descricao_status
          : response.faultstring
      }`
    );
};
