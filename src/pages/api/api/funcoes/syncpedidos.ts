import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;
  if (!email) return res.status(200).json({ erro: "Usuario não possui email" });
  await axios.get(
    `http://localhost:3333/syncContas?key=${process.env.API_KEY}&email=${email}`
  );
  res
    .status(200)
    .json(
      "Solicitado com sucesso, você ira receber em breve uma notificação no WhatsApp"
    );
};
