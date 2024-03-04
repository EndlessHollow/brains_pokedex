"use client";

import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";

type Props = {
  id: string;
  isFavorite: boolean;
  handleFavorite: (id: string, isFavorite: boolean) => void;
};

export default function Favorite(props: Props) {
  const { id, isFavorite, handleFavorite } = props;

  return (
    <Button
      variant="light"
      isIconOnly
      aria-label="Like"
      onClick={() => handleFavorite(id, isFavorite)}
    >
      {isFavorite ? (
        <HeartIcon className="w-7 text-rose-600" />
      ) : (
        <HeartOutlineIcon className="w-7 text-rose-600" />
      )}
    </Button>
  );
}
