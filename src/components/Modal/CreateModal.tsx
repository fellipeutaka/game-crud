import { Dispatch, FormEvent, SetStateAction, useState } from "react";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal as Container,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast,
} from "@chakra-ui/react";
import { Games as Game } from "@prisma/client";

type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setGames: Dispatch<SetStateAction<Game[] | null>>;
};

export default function CreateModal({
  isOpen,
  onClose,
  setGames,
}: CreateModalProps) {
  const formDataInitialState = {
    id: crypto.randomUUID(),
    name: "",
    description: "",
    price: "0.00",
    releaseDate: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(formDataInitialState);
  const toast = useToast({
    duration: 4500,
    isClosable: true,
    position: "top-right",
  });

  async function handleCreateGame(e: FormEvent) {
    e.preventDefault();
    const { name, description, price, releaseDate } = formData;
    if (!name || !description || !price || !releaseDate) {
      toast({
        title: "Error",
        description: "All fields are required!",
        status: "error",
      });
    } else {
      const newGame = {
        id: crypto.randomUUID(),
        name,
        description,
        price: Number(price),
        releaseDate: new Date(releaseDate),
      };
      setIsLoading(true);
      const response = await fetch("/api/games", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGame),
      });
      if (response.ok) {
        setFormData(formDataInitialState);
        setGames((games) => games && [newGame, ...games]);
        onClose();
        toast({
          title: "Success",
          description: "Game created successfully!",
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
  }

  return (
    <Container isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Game</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleCreateGame}>
          <ModalBody>
            <Flex as={ModalBody} flexDir="column" gap="4">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((data) => ({ ...data, name: e.target.value }))
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((data) => ({
                      ...data,
                      description: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <NumberInput
                  name="price"
                  defaultValue={0}
                  precision={2}
                  value={formData.price}
                  onChange={(value) =>
                    setFormData((data) => ({ ...data, price: value }))
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Release date</FormLabel>
                <Input
                  name="releaseDate"
                  type="date"
                  value={formData.releaseDate}
                  onChange={(e) =>
                    setFormData((data) => ({
                      ...data,
                      releaseDate: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button mr="2" onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" type="submit" isLoading={isLoading}>
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Container>
  );
}
