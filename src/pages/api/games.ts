import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";
import { addGame, getGames } from "../../services/games";

export default async function games(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const games = await getGames();
    return res.status(200).json({ data: games });
  } else if (req.method === "POST") {
    const { id, name, description, price, releaseDate } = req.body;

    if (!id || !name || !description || isNaN(price) || !releaseDate) {
      return res.status(400).json({ message: "Invalid params" });
    }

    await addGame({
      id,
      name,
      description,
      price,
      releaseDate,
    });

    return res.status(201).json({ status: "Ok" });
  } else if (req.method === "PUT") {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    const { name, description, price, releaseDate } = req.body;

    if (!name || !description || !price || !releaseDate) {
      return res.status(400).json({ message: "Invalid params" });
    }

    await prisma.games.update({
      data: {
        name,
        description,
        price,
        releaseDate,
      },
      where: {
        id: String(id),
      },
    });
    return res.status(200).json({ status: "OK" });
  } else if (req.method === "DELETE") {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    await prisma.games.delete({
      where: {
        id: String(id),
      },
    });
    return res.status(200).json({ status: "OK" });
  } else {
    return res.status(400).json({ message: "Invalid method" });
  }
}
