import Link from "next/link";
import Preview from "../preview/preview";
import { cn } from "@nextui-org/react";
import { TPokemon } from "@/app/lib/types";

type Props = {
  pokemon: TPokemon;
  gridView?: boolean;
  hasPreview?: boolean;
};

export default function Information(props: Props) {
  const { pokemon, gridView, hasPreview } = props;

  const pokemonType = pokemon.types.join(" | ");

  return (
    <div
      className={cn("grid", {
        [informationContainerGridView]: gridView,
        [informationContainerListView]: !gridView,
      })}
    >
      <div className="flex flex-col items-start">
        <Link href={`/${pokemon.name}`}>
          <h4 className="font-semibold text-large transition-colors hover:text-neutral-300">
            {pokemon.name}
          </h4>
        </Link>
        <p className="text-tiny uppercase font-semibold">{pokemonType}</p>
      </div>
      {hasPreview && <Preview pokemon={pokemon} pokemonTypes={pokemonType} />}
    </div>
  );
}

const informationContainerGridView = "gap-2";
const informationContainerListView = "gap-1";
