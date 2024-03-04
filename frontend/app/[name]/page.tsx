"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Image from "next/image";
import Overview from "./components/overview";
import List from "../ui/list/list";
import Headline from "./components/headline";
import { GET_POKEMON_BY_NAME } from "./api/get-pokemon-by-name";
import { TPokemon, TPokemonDetail } from "../lib/types";
import AudioButton from "./components/audio-button";
import { notFound } from "next/navigation";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useMutation } from "@apollo/client";
import { FAVORITE_POKEMON } from "../api/favorite-pokemon";
import { UNFAVORITE_POKEMON } from "../api/unfavorite-pokemon";
import { GET_POKEMONS } from "../api/get-pokemons";
import Evolutions from "./components/evolutions";
import { TPokemonDetailQueryResponse } from "./api/types";

type Props = {
  params: {
    name: string;
  };
};

export default function Page(props: Props) {
  const { params } = props;

  const { data } = useSuspenseQuery<TPokemonDetailQueryResponse>(
    GET_POKEMON_BY_NAME,
    {
      variables: {
        name: params.name,
      },
    },
  );

  const pokemon: TPokemonDetail = data.pokemonByName;

  const [favoritePokemon] = useMutation(FAVORITE_POKEMON);

  const [unfavoritePokemon] = useMutation(UNFAVORITE_POKEMON);

  function handleFavorite(id: string, isFavorite: boolean) {
    const mutation = isFavorite ? unfavoritePokemon : favoritePokemon;
    mutation({
      variables: {
        [isFavorite ? "unFavoritePokemonId" : "favoritePokemonId"]: id,
      },
      update(cache) {
        const currentPokemonData = cache.readQuery({
          query: GET_POKEMON_BY_NAME,
          variables: { name: params.name },
        });

        if (currentPokemonData) {
          let newData = JSON.parse(JSON.stringify(currentPokemonData));

          if (newData.pokemonByName.id === id) {
            newData.pokemonByName.isFavorite = !isFavorite;
          } else {
            let evolutionIndex = newData.pokemonByName.evolutions.findIndex(
              (evolution: TPokemon) => evolution.id === id,
            );
            if (evolutionIndex !== -1) {
              newData.pokemonByName.evolutions[evolutionIndex].isFavorite =
                !isFavorite;
            }
          }

          cache.writeQuery({
            query: GET_POKEMON_BY_NAME,
            variables: { name: params.name },
            data: newData,
          });
        }

        const existingPokemonsData = cache.readQuery({ query: GET_POKEMONS });
        if (existingPokemonsData) {
          let newPokemonsData = JSON.parse(
            JSON.stringify(existingPokemonsData),
          );
          let updatedPokemons = newPokemonsData.pokemons.edges.map(
            (edge: { node: { id: string; isFavorite: boolean } }) => {
              if (edge.node.id === id) {
                edge.node.isFavorite = !isFavorite;
              }
              return edge;
            },
          );

          cache.writeQuery({
            query: GET_POKEMONS,
            data: {
              pokemons: {
                ...newPokemonsData.pokemons,
                edges: updatedPokemons,
              },
            },
          });
        }
      },
    });
  }

  if (!pokemon) {
    notFound();
  }

  return (
    <main className="grid gap-y-6">
      <Headline />
      <Card className="sm:grid grid-cols-2 bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-150 shadow-medium">
        <CardHeader className="p-0 relative h-96">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            fill={true}
            className="object-cover"
          />
          <AudioButton sound={pokemon.sound} />
        </CardHeader>
        <CardBody className="sm:justify-center md:p-8">
          <Overview pokemon={pokemon} handleFavorite={handleFavorite} />
        </CardBody>
      </Card>
      {Boolean(pokemon.evolutions.length) && (
        <Evolutions
          evolutions={pokemon.evolutions}
          handleFavorite={handleFavorite}
        />
      )}
    </main>
  );
}
