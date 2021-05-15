// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { RequestOmie } from "../../../_request";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ erro: "Nao autorizado" });
  await GetContasAPagar(req, res);
};

async function GetContasAPagar(req: NextApiRequest, res: NextApiResponse) {
  let { pagina } = req.body;
  let response = await RequestOmie({
    call: "ListarContasPagar",
    path: "financas/contapagar/",
    param: {
      pagina: pagina,
      apenas_importado_api: "N",
      filtrar_apenas_titulos_em_aberto: "S",
      filtrar_por_status: "AVENCER",
      registros_por_pagina: 100,
    },
  });
  res.status(200).json(response);
}
