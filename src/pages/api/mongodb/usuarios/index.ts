import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let user = await GetOneUser(req, res);
  res.status(200).json(user);
};

async function GetOneUser(req: NextApiRequest, res: NextApiResponse) {
  const Client = await connectToDatabase();
  const db: Db = Client.db();
  const { email } = req.query;
  if (!email) return { erro: "Email nao foi informado" };
  let user = await db.collection("usuarios").findOne({ email });
  return user;
}
