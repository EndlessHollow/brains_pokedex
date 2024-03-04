import lodash from "lodash";
import { BASE_URL } from "./static";
import pokemonsData from "./pokemons.json";

let favorites = new Map();

export const resolvers = {
  Query: {
    pokemons: (_, args) => {
      const { limit, offset, search, filter } = args.query;
      let pokemons = pokemonsData;

      if (search) {
        const regex = new RegExp(search, "i");
        pokemons = lodash.filter(pokemons, (p) => p.name.match(regex));
      }

      if (filter) {
        if (filter.type) {
          const regex = new RegExp(filter.type, "i");
          pokemons = lodash.filter(pokemons, (p) =>
            lodash.some(p.types, (t) => t.match(regex)),
          );
        }

        if (filter.isFavorite) {
          pokemons = lodash.filter(pokemons, (p) => !!favorites.get(p.id));
        }
      }

      const count = pokemons.length;
      const edges = pokemons.slice(offset, offset + limit);

      return {
        limit,
        offset,
        count,
        edges,
      };
    },
    pokemonById: (_, args) =>
      pokemonsData.find((pokemon) => pokemon.id === args.id),
    pokemonByName: (_, args) =>
      pokemonsData.find(
        (pokemon) => pokemon.name.toLowerCase() === args.name.toLowerCase(),
      ),
    pokemonTypes: () =>
      lodash.uniq(lodash.flatMap(pokemonsData, (pokemon) => pokemon.types)),
  },
  Mutation: {
    favoritePokemon: (_, args) => {
      const pokemon = pokemonsData.find((pokemon) => pokemon.id === args.id);
      if (!pokemon) throw Error("Pokemon not found");
      favorites.set(args.id, true);
      return pokemon;
    },
    unFavoritePokemon: (_, args) => {
      const pokemon = pokemonsData.find((pokemon) => pokemon.id === args.id);
      if (!pokemon) throw Error("Pokemon not found");
      favorites.set(args.id, false);
      return pokemon;
    },
  },
  Pokemon: {
    number: (pokemon) => parseInt(pokemon.id, 10),
    image: (pokemon) =>
      `https://img.pokemondb.net/artwork/${pokemon.name
        .toLowerCase()
        .replace(/[&\\/\\\\#,+()$~%.'":*?<>{}]/g, "")
        .replace(" ", "-")}.jpg`,
    sound: (pokemon) => `${BASE_URL}/sounds/${parseInt(pokemon.id, 10)}`,
    evolutions: (pokemon) => {
      if (!pokemon.evolutions) {
        return [];
      }
      const pokemonEvolutionNames = pokemon.evolutions.map((ev) => {
        return ev.name.toLowerCase();
      });

      const evolutions = pokemonsData.filter((pokemon) =>
        pokemonEvolutionNames.includes(pokemon.name.toLowerCase()),
      );

      const transformedPokemons = evolutions.map((pokemon) => {
        return {
          ...pokemon,
          image: `https://img.pokemondb.net/artwork/${pokemon.name
            .toLowerCase()
            .replace(/[&\\/\\\\#,+()$~%.'":*?<>{}]/g, "")
            .replace(" ", "-")}.jpg`,
          isFavorite: !!favorites.get(pokemon.id),
        };
      });

      return transformedPokemons;
    },
    isFavorite: (pokemon) => !!favorites.get(pokemon.id),
  },
  PokemonAttack: {
    fast: (pokemonAttack) => pokemonAttack.fast || [],
    special: (pokemonAttack) => pokemonAttack.special || [],
  },
};
