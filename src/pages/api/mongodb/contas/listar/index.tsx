import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToCachedDb } from "../../../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let Client: MongoClient = await connectToCachedDb();
  let contas = await Client.db().collection("contas").find({}).toArray();
  res.status(200).json(contas);
};
