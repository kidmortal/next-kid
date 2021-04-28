// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { baixaResponse } from "../../../../../context/AppContext";
import { GetOneNfByNumero } from "../../notas/consultar";
import { RequestOmie } from "../../_request";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { codigo_baixa } = req.body;
  if (!codigo_baixa)
    return res.status(200).json({ message: "Sem codigo_baixa" });

  let response = await RequestOmie({
    call: "CancelarRecebimento",
    path: "financas/contareceber/",
    param: {
      codigo_baixa: codigo_baixa,
    },
  });
  console.log(response);
  res.status(200).json(response);
};
