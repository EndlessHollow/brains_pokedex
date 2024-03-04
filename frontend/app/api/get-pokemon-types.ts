import { gql } from "@apollo/client";

export const GET_POKEMON_TYPES = gql`
  query PokemonTypes {
    pokemonTypes
  }
`;
