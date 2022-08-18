import { Dispatch, SetStateAction } from "react";
import { BiChevronDown, BiPencil, BiTrashAlt } from "react-icons/bi";

import {
  Button,
  Menu as Container,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Games as Game } from "@prisma/client";

import AlertDialog from "@game-crud/components/AlertDialog";
import UpdateModal from "@game-crud/components/Modal/UpdateModal";

type MenuProps = {
  game: Game;
  setGames: Dispatch<SetStateAction<Game[] | null>>;
};

export default function Menu({ game, setGames }: MenuProps) {
  const alertDialog = useDisclosure();
  const modal = useDisclosure();
  function handleEditItem() {
    modal.onOpen();
  }

  function handleDeleteItem() {
    alertDialog.onOpen();
  }

  return (
    <Container>
      <MenuButton as={Button} aria-label="Actions" size="sm">
        <BiChevronDown />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleEditItem}>
          <Text display="flex" alignItems="center" gap="1">
            <BiPencil /> Edit
          </Text>
        </MenuItem>
        <UpdateModal
          isOpen={modal.isOpen}
          onClose={modal.onClose}
          game={game}
          setGames={setGames}
        />
        <MenuItem onClick={handleDeleteItem}>
          <Text display="flex" alignItems="center" gap="1">
            <BiTrashAlt /> Delete
          </Text>
        </MenuItem>
        <AlertDialog
          isOpen={alertDialog.isOpen}
          onClose={alertDialog.onClose}
          game={game}
          setGames={setGames}
        />
      </MenuList>
    </Container>
  );
}
