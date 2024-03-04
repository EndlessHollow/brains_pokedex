"use client";

import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";

type Props = {
  sound: string;
};

export default function AudioButton(props: Props) {
  const { sound } = props;

  function handlePlaySound() {
    const audio = new Audio(sound);
    audio.play();
  }
  return (
    <Button
      isIconOnly
      onClick={handlePlaySound}
      aria-label="Play music"
      className="absolute bottom-2 left-2"
    >
      <MusicalNoteIcon className="w-7" />
    </Button>
  );
}
