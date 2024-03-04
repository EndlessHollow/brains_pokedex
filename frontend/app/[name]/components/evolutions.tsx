import { TPokemon } from "@/app/lib/types";
import List from "@/app/ui/list/list";

type Props = {
  evolutions: TPokemon[];
  handleFavorite: (id: string, isFavorite: boolean) => void;
};

export default function Evolutions(props: Props) {
  const { evolutions, handleFavorite } = props;

  return (
    <div className="grid gap-y-4">
      <h4 className="font-semibold text-xl">Evolutions</h4>
      <List pokemons={evolutions} handleFavorite={handleFavorite} />
    </div>
  );
}
