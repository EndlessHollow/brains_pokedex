import { gql } from "@apollo/client";

export const FAVORITE_POKEMON = gql`
  mutation FavoritePokemon($favoritePokemonId: ID!) {
    favoritePokemon(id: $favoritePokemonId) {
      id
    }
  }
`;
