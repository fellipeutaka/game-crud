import { Dispatch, SetStateAction, useRef, useState } from "react";

import {
  AlertDialog as Container,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Games as Game } from "@prisma/client";

type AlertDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  game: Game;
  setGames: Dispatch<SetStateAction<Game[] | null>>;
};

export default function AlertDialog({
  isOpen,
  onClose,
  game,
  setGames,
}: AlertDialogProps) {
  const toast = useToast({
    duration: 4500,
    isClosable: true,
    position: "top-right",
  });
  const alertDialogCancelRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteItem() {
    setIsLoading(true);
    const response = await fetch(`/api/games?id=${game.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      onClose();
      setGames(
        (state) => state?.filter((games) => games.id !== game.id) ?? state
      );
      toast({
        title: "Success",
        description: "Game deleted successfully!",
        status: "success",
      });
    } else {
      toast({
        title: "Error",
        description: "Unexpected error!",
        status: "error",
      });
    }
    setIsLoading(false);
  }

  return (
    <Container
      leastDestructiveRef={alertDialogCancelRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete game
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can&apos;t undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={alertDialogCancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDeleteItem}
              ml="2"
              isLoading={isLoading}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </Container>
  );
}
