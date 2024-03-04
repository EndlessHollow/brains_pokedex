import { Card, CardHeader, CardBody } from "@nextui-org/card";
import Image from "next/image";
import Information from "./information";
import { cn } from "@nextui-org/react";
import Link from "next/link";
import { TPokemon } from "@/app/lib/types";
import Favorite from "../favorite/favorite";

type Props = {
  pokemon: TPokemon;
  handleFavorite: (id: string, isFavorite: boolean) => void;
  gridView?: boolean;
  hasPreview?: boolean;
};

export default function ListItem(props: Props) {
  const { pokemon, gridView, hasPreview, handleFavorite } = props;

  return (
    <div>
      <Card
        isBlurred
        className={cn(
          "p-6 gap-6 bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-150 shadow-medium",
          {
            [cardListView]: !gridView,
          },
        )}
      >
        <CardHeader
          className={cn("justify-between items-start p-0", {
            [cardHeaderListView]: !gridView,
          })}
        >
          {gridView ? (
            <>
              <Information
                pokemon={pokemon}
                gridView={gridView}
                hasPreview={hasPreview}
              />
              <Favorite
                id={pokemon.id}
                isFavorite={pokemon.isFavorite}
                handleFavorite={handleFavorite}
              />
            </>
          ) : (
            <Link href={`/${pokemon.name}`}>
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                fill={true}
                className="object-cover rounded-xl"
              />
            </Link>
          )}
        </CardHeader>
        <CardBody
          className={cn("p-0", {
            "h-64": gridView,
            [cardBodyListView]: !gridView,
          })}
        >
          {gridView ? (
            <Link
              href={`/${pokemon.name}`}
              className={"relative w-full h-full"}
            >
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                fill={true}
                className="object-cover rounded-xl"
              />
            </Link>
          ) : (
            <>
              <Information pokemon={pokemon} hasPreview={hasPreview} />
              <Favorite
                id={pokemon.id}
                isFavorite={pokemon.isFavorite}
                handleFavorite={handleFavorite}
              />
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

const cardListView = "flex-row justify-start gap-3";
const cardHeaderListView = "relative w-16 h-16";
const cardBodyListView = "flex-row justify-between items-center";
