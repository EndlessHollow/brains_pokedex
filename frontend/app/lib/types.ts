export type TMeasurements = {
  maximum: string;
  minimum: string;
};

export type TPokemon = {
  id: string;
  name: string;
  types: string[];
  isFavorite: boolean;
  image: string;
  maxCP: number;
  maxHP: number;
};

export type TPokemonDetail = {
  id: string;
  name: string;
  types: string[];
  isFavorite: boolean;
  image: string;
  sound: string;
  maxCP: number;
  maxHP: number;
  weight: TMeasurements;
  height: TMeasurements;
  evolutions: TPokemon[];
};
