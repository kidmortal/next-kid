import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { MongoUser } from "../../../../models/mongoUser";
import { connectToCachedDb, connectToNewDb } from "../../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, props } = req.body;
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ erro: "Nao autorizado" });

  if (!email) return res.status(200).json({ erro: "Email nao informada" });
  let Client: MongoClient = await connectToCachedDb();
  let contas = await Client.db()
    .collection("contas")
    .find(props || {})
    .toArray();
  res.status(200).json(contas);
};
