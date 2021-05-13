import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { MongoUser } from "../../../../models/mongoUser";
import { connectToCachedDb, connectToNewDb } from "../../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { nome } = req.body;

  if (!nome) return res.status(200).json({ erro: "nome nao informada" });
  GetOneEmpresa(req, res);
};

async function GetOneEmpresa(req: NextApiRequest, res: NextApiResponse) {
  let nome: string = req.body?.nome;
  nome = nome.toUpperCase();
  let empresa;
  let Client = await connectToCachedDb();
  empresa = await Client.db().collection("empresas").findOne({ nome });
  res.status(200).json(empresa);
}
