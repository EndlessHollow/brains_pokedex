"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { TPokemon } from "./types";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { OperationVariables, useMutation } from "@apollo/client";
import {
  FetchMoreFunction,
  useSuspenseQuery,
} from "@apollo/client/react/hooks/useSuspenseQuery";
import { GET_POKEMONS } from "@/app/api/get-pokemons";
import { GET_POKEMON_TYPES } from "@/app/api/get-pokemon-types";
import { UNFAVORITE_POKEMON } from "@/app/api/unfavorite-pokemon";
import { FAVORITE_POKEMON } from "@/app/api/favorite-pokemon";
import { TPokemonsQueryResponse } from "../api/types";

type CtxProps = {
  pokemons: TPokemon[];
  totalCount: number;
  pokemonType: string;
  loadMore: () => void;
  searchTerm: string;
  debouncedSearchTerm: string;
  gridView: boolean;
  activeTab: string;
  setActiveTab: (value: string) => void;
  setSearchTerm: (value: string) => void;
  setGridView: (value: boolean) => void;
  pokemonTypes: string[];
  handleSelectType: (value: string) => void;
  handleSearch: (value: string) => void;
  handleFavorite: (id: string, isFavorite: boolean) => void;
};

type Props = {
  children: React.ReactNode;
};

const Ctx = createContext<CtxProps | undefined>(undefined);

export function PokemonsProvider(props: Props) {
  const { children } = props;

  const [activeTab, setActiveTab] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonType, setPokemonType] = useState("");
  const [gridView, setGridView] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { data: pokemonsData, fetchMore } =
    useSuspenseQuery<TPokemonsQueryResponse>(GET_POKEMONS, {
      variables: {
        query: {
          limit: 50,
          search: debouncedSearchTerm || null,
          filter: {
            type: pokemonType || null,
            isFavorite: Boolean(activeTab === "favorite"),
          },
        },
      },
      fetchPolicy: "cache-and-network",
    });
  const { data: pokemonTypesData } = useSuspenseQuery<{
    pokemonTypes: string[];
  }>(GET_POKEMON_TYPES);

  const pokemons = pokemonsData?.pokemons?.edges || [];
  const totalCount = pokemonsData?.pokemons?.count || 0;
  const pokemonTypes: string[] = pokemonTypesData?.pokemonTypes || [];

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    setSearchTerm(value);
    if (!value) {
      params.delete("term");
    } else {
      params.set("term", value);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSelectType = (value: string) => {
    const params = new URLSearchParams(searchParams);
    setPokemonType(value);

    if (!value) {
      params.delete("filter");
    } else {
      params.set("filter", value);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const [favoritePokemon] = useMutation(FAVORITE_POKEMON);

  const [unfavoritePokemon] = useMutation(UNFAVORITE_POKEMON);

  function handleFavorite(id: string, isFavorite: boolean) {
    if (isFavorite) {
      unfavoritePokemon({
        variables: { unFavoritePokemonId: id },
        update(cache) {
          const existingPokemonsData: TPokemonsQueryResponse | null =
            cache.readQuery({
              query: GET_POKEMONS,
              variables: {
                query: {
                  limit: 50,
                  search: debouncedSearchTerm || null,
                  filter: {
                    type: pokemonType || null,
                    isFavorite: activeTab === "favorite",
                  },
                },
              },
            });

          if (activeTab === "favorite") {
            const newPokemonsEdges =
              existingPokemonsData?.pokemons.edges.filter(
                (pokemon) => pokemon.id !== id,
              );
            cache.writeQuery({
              query: GET_POKEMONS,
              variables: {
                query: {
                  limit: 50,
                  search: debouncedSearchTerm || null,
                  filter: {
                    type: pokemonType || null,
                    isFavorite: activeTab === "favorite",
                  },
                },
              },
              data: {
                pokemons: {
                  ...existingPokemonsData?.pokemons,
                  edges: newPokemonsEdges,
                },
              },
            });
          } else {
            const updatedPokemonsEdges =
              existingPokemonsData?.pokemons.edges.map((pokemon) => {
                if (pokemon.id === id) {
                  return { ...pokemon, isFavorite: false };
                }
                return pokemon;
              });
            cache.writeQuery({
              query: GET_POKEMONS,
              variables: {
                query: {
                  limit: 50,
                  search: debouncedSearchTerm || null,
                  filter: {
                    type: pokemonType || null,
                    isFavorite: activeTab === "favorite",
                  },
                },
              },
              data: {
                pokemons: {
                  ...existingPokemonsData?.pokemons,
                  edges: updatedPokemonsEdges,
                },
              },
            });
          }
        },
      });
    } else {
      favoritePokemon({
        variables: { favoritePokemonId: id },
        update(cache) {
          const existingPokemonsData: TPokemonsQueryResponse | null =
            cache.readQuery({
              query: GET_POKEMONS,
              variables: {
                query: {
                  limit: 50,
                  search: debouncedSearchTerm || null,
                  filter: {
                    type: pokemonType || null,
                    isFavorite: activeTab === "favorite",
                  },
                },
              },
            });

          const updatedPokemonsEdges = existingPokemonsData?.pokemons.edges.map(
            (pokemon) => {
              if (pokemon.id === id) {
                return { ...pokemon, isFavorite: true };
              }
              return pokemon;
            },
          );

          cache.writeQuery({
            query: GET_POKEMONS,
            variables: {
              query: {
                limit: 50,
                search: debouncedSearchTerm || null,
                filter: {
                  type: pokemonType || null,
                  isFavorite: activeTab === "favorite",
                },
              },
            },
            data: {
              pokemons: {
                ...existingPokemonsData?.pokemons,
                edges: updatedPokemonsEdges,
              },
            },
          });
        },
      });
    }
  }

  function loadMore() {
    fetchMore?.({
      variables: {
        query: {
          limit: 50,
          offset: pokemons.length || 0,
        },
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          ...prevResult,
          pokemons: {
            ...prevResult.pokemons,
            edges: [
              ...prevResult.pokemons.edges,
              ...fetchMoreResult.pokemons.edges,
            ],
            count: fetchMoreResult.pokemons.count,
          },
        };
      },
    });
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (params.has("filter")) {
      const filterValue = params.get("filter");
      if (filterValue) {
        setPokemonType(filterValue);
      }
    }

    if (params.has("term")) {
      const searchValue = params.get("term");
      if (searchValue) {
        setSearchTerm(searchValue);
      }
    }
  }, [searchParams]);

  const value = {
    pokemons,
    totalCount,
    loadMore,
    pokemonType,
    searchTerm,
    debouncedSearchTerm,
    gridView,
    activeTab,
    setActiveTab,
    setSearchTerm,
    setGridView,
    pokemonTypes,
    handleSelectType,
    handleSearch,
    handleFavorite,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePokemons() {
  const ctx = useContext(Ctx);

  if (!ctx) {
    throw new Error("usePokemons must be used within a PokemonsProvider");
  }

  return ctx;
}
