import prisma from "../../lib/prisma";
import { validateRoute } from "../../lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user) => {
    const data = req.body;

    const createPlaylist = await prisma.playlist.create({ data });

    if (createPlaylist) {
      res.json(createPlaylist);
    }
  }
);
