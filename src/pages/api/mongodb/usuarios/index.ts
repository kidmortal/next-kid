import { NextApiRequest, NextApiResponse } from "next";
import { connectToCachedDb, connectToNewDb } from "../../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query;
  let user = await GetOneUser(email);
  return res.status(200).json(user);
};

async function GetOneUser(email) {
  let Client, user;
  if (!email) return { erro: "Email nao foi informado" };
  try {
    Client = await connectToCachedDb();
    user = await Client.db().collection("usuarios").findOne({ email });
    console.log("Using Cached Connection");
  } catch (error) {
    Client = await connectToNewDb();
    user = await Client.db().collection("usuarios").findOne({ email });
    console.log("Created new connection");
  }
  return user;
}
