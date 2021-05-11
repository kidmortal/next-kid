import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res
    .status(200)
    .json(
      "Solicitado com sucesso, você ira receber em breve uma notificação no WhatsApp"
    );
  axios.get(`${process.env.API_URL}/mongodb/contas?key=${process.env.API_KEY}`);
};
