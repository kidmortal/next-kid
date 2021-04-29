import { NextApiRequest, NextApiResponse } from "next";
import { connectToCachedDb, connectToNewDb } from "../../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return {
    statusCode: 201,
    body: { data: req.query },
  };
};
