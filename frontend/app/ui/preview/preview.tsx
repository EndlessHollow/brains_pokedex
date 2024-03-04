"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import React from "react";
import Image from "next/image";
import Stats from "./stats";
import Information from "./information";
import { TPokemon } from "@/app/lib/types";

type Props = {
  pokemon: TPokemon;
  pokemonTypes: string;
};

export default function Preview(props: Props) {
  const { pokemon, pokemonTypes } = props;

  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} size="sm" variant="ghost">
        Preview
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement={"center"}
        backdrop="blur"
        classNames={{
          closeButton: "z-10 text-gray-900 hover:text-white transition-colors",
        }}
      >
        <ModalContent className="grid gap-6">
          {(onClose) => (
            <>
              <ModalHeader className="relative flex flex-col gap-1 h-72">
                <Image
                  src={pokemon.image}
                  alt={pokemon.name}
                  fill={true}
                  className="object-cover rounded-large rounded-b-none"
                />
              </ModalHeader>
              <ModalBody className="grid gap-4 py-0">
                <Information title={pokemon.name} content={pokemonTypes} />
                <Stats maxCP={pokemon.maxCP} maxHP={pokemon.maxHP} />
              </ModalBody>
              <ModalFooter className="justify-start">
                <Button onPress={onClose} variant="ghost">
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
