import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { client } from "websocket";
import { connectToCachedDb, connectToNewDb } from "../../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let user = await GetOneUser(req, res);
  res.status(200).json(user);
};

async function GetOneUser(req: NextApiRequest, res: NextApiResponse) {
  let Client, user;
  const { email } = req.query;
  if (!email) return { erro: "Email nao foi informado" };
  try {
    Client = await connectToCachedDb();
    user = await Client.db().collection("usuarios").findOne({ email });
    console.log("Using Cached Connection");
    return user;
  } catch (error) {
    Client = await connectToNewDb();
    user = await Client.db().collection("usuarios").findOne({ email });
    console.log("Created new connection");
    return user;
  }
}
