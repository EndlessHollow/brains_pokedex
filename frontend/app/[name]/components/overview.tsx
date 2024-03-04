import { Divider } from "@nextui-org/divider";
import { BaseInformation } from "./base-infromation";
import AdditionalInformation from "./additional-information";
import { TPokemonDetail } from "@/app/lib/types";

type Props = {
  pokemon: TPokemonDetail;
  handleFavorite: (id: string, isFavorite: boolean) => void;
};

export default function Overview(props: Props) {
  const { pokemon } = props;

  return (
    <>
      <BaseInformation
        id={pokemon.id}
        name={pokemon.name}
        types={pokemon.types}
        isFavorite={pokemon.isFavorite}
        maxCP={pokemon.maxCP}
        maxHP={pokemon.maxHP}
        handleFavorite={props.handleFavorite}
      />
      <Divider className="w-full" />
      <AdditionalInformation height={pokemon.height} weight={pokemon.weight} />
    </>
  );
}
