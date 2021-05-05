// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { baixaResponse } from "../../../../../../context/AppContext";
import { GetOneNfByNumero } from "../../../notas/consultar";
import { RequestOmie } from "../../../_request";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await GetContasAReceber(req, res);
};

async function GetContasAReceber(req: NextApiRequest, res: NextApiResponse) {
  let { pagina } = req.body;
  let response = await RequestOmie({
    call: "ListarContasReceber",
    path: "financas/contareceber/",
    param: {
      pagina: pagina,
      apenas_importado_api: "N",
      filtrar_apenas_titulos_em_aberto: "S",
      filtrar_por_status: "AVENCER",
      registros_por_pagina: 100,
      filtrar_conta_corrente: 327494661,
    },
  });
  res.status(200).json(response);
}
