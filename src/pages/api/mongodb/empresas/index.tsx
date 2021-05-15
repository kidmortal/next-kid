import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { MongoUser } from "../../../../models/mongoUser";
import { connectToCachedDb, connectToNewDb } from "../../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { call } = req.body;
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ erro: "Nao autorizado" });

  if (!call) return res.status(200).json({ erro: "Funcao call nao informada" });
  switch (call) {
    case "getEmpresa":
      await GetEmpresa(req, res);
      break;

    case "setEmpresa":
      await SetEmpresa(req, res);
      break;

    default:
      res.status(200).json({ erro: "Call desconhcida" });
      break;
  }
};

async function GetEmpresa(req: NextApiRequest, res: NextApiResponse) {
  let { props } = req.body;
  if (!props) return res.status(200).json({ erro: "Props nao informado" });
  let Client = await connectToCachedDb();
  let empresa = await Client.db().collection("empresas").findOne(props);
  res.status(200).json(empresa);
}

async function SetEmpresa(req: NextApiRequest, res: NextApiResponse) {
  const { id, props } = req.body;
  if (!id) return res.status(200).json({ erro: "ID nao foi informado" });
  if (!props) return res.status(200).json({ erro: "Props nao foi informado" });
  let Client = await connectToCachedDb();
  let filter = { _id: new ObjectId(id) };
  let options = { upsert: true, returnOriginal: false };
  let response = await Client.db()
    .collection("empresas")
    .findOneAndUpdate(filter, { $set: props }, options);
  res.status(200).json(response.ok);
}
