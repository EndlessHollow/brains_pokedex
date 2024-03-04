import { gql } from "@apollo/client";

export const GET_POKEMON_BY_NAME = gql`
  query PokemonByName($name: String!) {
    pokemonByName(name: $name) {
      id
      name
      types
      isFavorite
      image
      sound
      maxCP
      maxHP
      weight {
        maximum

        minimum
      }
      height {
        maximum
        minimum
      }
      evolutions {
        id
        name
        types
        image
        isFavorite
      }
    }
  }
`;
