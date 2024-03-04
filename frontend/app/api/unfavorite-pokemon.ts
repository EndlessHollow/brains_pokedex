import { gql } from "@apollo/client";

export const UNFAVORITE_POKEMON = gql`
  mutation UnfavoritePokemon($unFavoritePokemonId: ID!) {
    unFavoritePokemon(id: $unFavoritePokemonId) {
      id
    }
  }
`;
