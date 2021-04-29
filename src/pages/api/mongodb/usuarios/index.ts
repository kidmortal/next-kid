import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToCachedDb, connectToNewDb } from "../../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query;
  let user = await GetOneUser(email);
  res.status(200).json(user);
};

async function GetOneUser(email) {
  let user;
  if (!email) return { erro: "Email nao foi informado" };

  let Client: MongoClient = await connectToNewDb();
  user = await Client.db().collection("usuarios").findOne({ email });
  console.log("Using New Connection");
  Client.close();
  return user;
}
