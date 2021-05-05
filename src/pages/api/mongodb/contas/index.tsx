import { NextApiRequest, NextApiResponse } from "next";
import { ContaAReceber } from "../../../../context/RelatorioFinanceiroContext";
import { connectToCachedDb } from "../../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { dados } = req.body;
  if (!dados) return res.status(200).json({ erro: "Sem dados" });
  let contas: ContaAReceber[] = dados;
  let Client = await connectToCachedDb();
  await Client.db().collection("contas_a_receber").drop();
  let bulk = Client.db()
    .collection("contas_a_receber")
    .initializeUnorderedBulkOp();
  await contas.forEach(({ valor, empresa, data, nota }) => {
    bulk.insert({
      data: new Date(data),
      nota,
      empresa,
      valor,
    });
  });
  await bulk.execute();
  res.status(200).json({ resultado: "ok" });
};
