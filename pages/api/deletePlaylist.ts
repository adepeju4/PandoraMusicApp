import prisma from "../../lib/prisma";
import { validateRoute } from "../../lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.body;

    const deletePlaylist = await prisma.playlist.delete({
      where: {
        id,
      },
    });

    if (deletePlaylist) {
      res.json(deletePlaylist);
    }
  }
);
