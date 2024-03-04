import Favorite from "@/app/ui/favorite/favorite";
import ProgressBar from "@/app/ui/progress-bar/progress-bar";

type Props = {
  id: string;
  name: string;
  types: string[];
  isFavorite: boolean;
  maxCP: number;
  maxHP: number;
  handleFavorite: (id: string, isFavorite: boolean) => void;
};

export function BaseInformation(props: Props) {
  const { id, name, types, maxCP, maxHP, isFavorite, handleFavorite } = props;

  const pokemonType = types.join(" | ");

  //COMMENT: Values are not provided via API
  const cp = 100;
  const hp = 200;

  return (
    <div className="grid gap-y-4 pb-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h3 className="font-semibold text-2xl">{name}</h3>
          <p className="text-small font-semibold uppercase">{pokemonType}</p>
        </div>
        <Favorite
          id={id}
          isFavorite={isFavorite}
          handleFavorite={handleFavorite}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <ProgressBar
          progressColor="primary"
          value={cp}
          maxValue={maxCP}
          label={"CP"}
        />
        <ProgressBar
          progressColor="success"
          value={hp}
          maxValue={maxHP}
          label={"HP"}
        />
      </div>
    </div>
  );
}
