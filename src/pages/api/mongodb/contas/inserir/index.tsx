import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Conta } from "../../../../../components/funcoesAdministrativas/AtualizarContas";
import { connectToCachedDb } from "../../../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { dados } = req.body;
  if (!dados) return res.status(200).json({ erro: "Sem dados" });
  let contas: Conta[] = dados;
  let Client: MongoClient = await connectToCachedDb();
  let bulk = Client.db().collection("contas").initializeUnorderedBulkOp();
  if (contas.length < 1) return res.status(200).json({ erro: "array vazio" });
  contas.forEach(({ valor, empresa, data, nota, tipo }) => {
    bulk.insert({
      data,
      tipo,
      nota,
      empresa,
      valor,
    });
  });
  let response = await bulk.execute();
  res.status(200).json(response.ok);
};
