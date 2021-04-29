import { NextApiRequest, NextApiResponse } from "next";
import { connectToCachedDb, connectToNewDb } from "../../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return req.query;
};
