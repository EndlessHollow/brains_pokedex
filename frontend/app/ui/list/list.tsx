"use client";

import ListItem from "./list-item";
import { TPokemon } from "@/app/lib/types";
import { Spinner, cn } from "@nextui-org/react";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  pokemons: TPokemon[];
  handleFavorite: (id: string, isFavorite: boolean) => void;
  loadMore?: () => void;
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
    loadMore,
    totalCount,
    handleFavorite,
    gridView = true,
    hasPreview = false,
    infiniteScroll = false,
  } = props;

  const hasMore = pokemons.length !== totalCount;

  if (infiniteScroll && loadMore) {
    return (
      <InfiniteScroll
        dataLength={pokemons.length}
        next={() => loadMore && loadMore()}
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

const gridViewStyles = "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";
