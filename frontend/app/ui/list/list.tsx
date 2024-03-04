"use client";

export const dynamic = "force-dynamic";

import { OperationVariables } from "@apollo/client";
import ListItem from "./list-item";
import { TPokemon } from "@/app/lib/types";
import { FetchMoreFunction } from "@apollo/client/react/hooks/useSuspenseQuery";
import { Spinner, cn } from "@nextui-org/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TPokemonsQueryResponse } from "@/app/api/types";

type Props = {
  pokemons: TPokemon[];
  handleFavorite: (id: string, isFavorite: boolean) => void;
  fetchMore?: FetchMoreFunction<TPokemonsQueryResponse, OperationVariables>;
  totalCount?: number;
  gridView?: boolean;
  hasPreview?: boolean;
  infiniteScroll?: boolean;
  className?: string;
};

export default function List(props: Props) {
  const {
    pokemons,
    className,
    fetchMore,
    totalCount,
    handleFavorite,
    gridView = true,
    hasPreview = false,
    infiniteScroll = false,
  } = props;

  const hasMore = pokemons.length !== totalCount;

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

  if (!infiniteScroll) {
    return (
      <ul
        className={cn(
          "grid gap-6 pb-6",
          {
            [gridViewStyles]: gridView,
          },

          className,
        )}
      >
        {pokemons.map((pokemon) => {
          return (
            <ListItem
              key={pokemon.name}
              pokemon={pokemon}
              gridView={gridView}
              handleFavorite={handleFavorite}
            />
          );
        })}
      </ul>
    );
  }

  return (
    <InfiniteScroll
      dataLength={pokemons.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<Spinner />}
      className={cn(
        "grid gap-6 pb-6",
        {
          [gridViewStyles]: gridView,
        },
        className,
      )}
    >
      {pokemons.map((pokemon) => {
        return (
          <ListItem
            key={pokemon.name}
            pokemon={pokemon}
            gridView={gridView}
            hasPreview={hasPreview}
            handleFavorite={handleFavorite}
          />
        );
      })}
    </InfiniteScroll>
  );
}

const gridViewStyles = "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";
