import { TPokemon } from "../lib/types";

export type TPokemonsQueryResponse = {
  pokemons: {
    edges: TPokemon[];
    count: number;
  };
};
