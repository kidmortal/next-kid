// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { baixaResponse } from "../../../../../context/AppContext";
import { GetOneNfByNumero } from "../../notas/consultar";
import { RequestOmie } from "../../_request";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { dataBaixa, Cc, nota, desconto, juros, valor } = req.body;
  if (!nota) return res.status(200).json({ message: "Nota sem numero" });

  let notaInfo, titulo, tituloNumero, valorFinal;

  try {
    notaInfo = await GetOneNfByNumero(nota);
    titulo = notaInfo.titulos[0];
    tituloNumero = titulo?.nCodTitulo;
    valor = valor ? valor : titulo?.nValorTitulo;
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
      observacao: "Baixa via Web app",
    },
  });
  console.log(response);
  res.status(200).json(response);
};
