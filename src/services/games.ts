import { Games as Game } from "@prisma/client";

import { prisma } from "../lib/prisma";

export async function getGames() {
  return await prisma.games.findMany();
}

export async function addGame({
  id,
  name,
  description,
  price,
  releaseDate,
}: Game) {
  await prisma.games.create({
    data: {
      id,
      name,
      description,
      price,
      releaseDate,
    },
  });
}

export async function updateGameById({
  id,
  name,
  description,
  price,
  releaseDate,
}: Game) {
  await prisma.games.update({
    data: {
      name,
      description,
      price,
      releaseDate,
    },
    where: {
      id,
    },
  });
}

export async function deleteGameById(id: string) {
  await prisma.games.delete({
    where: {
      id,
    },
  });
}
