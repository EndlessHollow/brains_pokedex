import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query Pokemons($query: PokemonsQueryInput!) {
    pokemons(query: $query) {
      edges {
        id
        name
        types
        isFavorite
        image
        maxCP
        maxHP
      }
      count
    }
  }
`;
