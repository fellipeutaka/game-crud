import { Dispatch, SetStateAction } from "react";

import { Box } from "@chakra-ui/react";
import { Games as Game } from "@prisma/client";

import { displayPrice } from "../../utils/displayPrice";
import Menu from "../Menu";

type BodyProps = {
  games: Game[];
  setGames: Dispatch<SetStateAction<Game[] | null>>;
};

export default function Body({ games, setGames }: BodyProps) {
  return (
    <tbody>
      {games.map((game) => (
        <Box as="tr" bgColor="gray.900" textAlign="center" key={game.id}>
          <Box as="td" py="4" px="6" maxW="8" textAlign="center">
            {game.name}
          </Box>
          <Box as="td" py="4" px="6" maxW="8" textAlign="center">
            {game.description}
          </Box>
          <Box as="td" py="4" px="6" maxW="8" textAlign="center">
            {displayPrice(game.price)}
          </Box>
          <Box as="td" py="4" px="6" maxW="8" textAlign="center">
            {new Date(game.releaseDate).toLocaleDateString()}
          </Box>
          <Box as="td" py="4" px="6" maxW="8" textAlign="center">
            <Menu game={game} setGames={setGames} />
          </Box>
        </Box>
      ))}
    </tbody>
  );
}
