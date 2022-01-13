import prisma from "../../lib/prisma";
import { validateRoute } from "../../lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body;
    const addToLibrary = await prisma.library.create({ data });

    if (addToLibrary) {
      res.json(addToLibrary);
    }
  }
);
