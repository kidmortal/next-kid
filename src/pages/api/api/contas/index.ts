import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ erro: "Nao autorizado" });
  res
    .status(200)
    .json(
      "Solicitado com sucesso, você ira receber em breve uma notificação no WhatsApp"
    );
  axios.get(`${process.env.API_URL}/mongodb/contas?key=${process.env.API_KEY}`);
};
