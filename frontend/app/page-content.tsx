"use client";

import { usePokemons } from "./lib/context";
import Header from "./ui/header/header";
import List from "./ui/list/list";
import NoData from "./ui/no-data/no-data";
import Tabs from "./ui/tabs/tabs";
import TabsContent from "./ui/tabs/tabs-content";

export default function PageContent() {
  const {
    pokemons,
    gridView,
    setActiveTab,
    loadMore,
    totalCount,
    handleFavorite,
  } = usePokemons();

  const tabs = [
    {
      id: "all",
      label: "All",
      component: !pokemons.length ? (
        <NoData
          headline="No data"
          content="Seems like there are not any pokemons"
        />
      ) : (
        <List
          pokemons={pokemons}
          className="max-w-7xl mx-auto px-6"
          loadMore={loadMore}
          totalCount={totalCount}
          handleFavorite={handleFavorite}
          gridView={gridView}
          hasPreview={true}
          infiniteScroll={true}
        />
      ),
    },
    {
      id: "favorite",
      label: "Favorite",
      component: !pokemons.length ? (
        <NoData
          headline="No data"
          content="Seems like you do not have any favorite pokemons"
        />
      ) : (
        <List
          pokemons={pokemons}
          className="max-w-7xl mx-auto px-6"
          loadMore={loadMore}
          totalCount={totalCount}
          handleFavorite={handleFavorite}
          gridView={gridView}
          hasPreview={true}
          infiniteScroll={true}
        />
      ),
    },
  ];

  return (
    <Tabs tabs={tabs} defaultTab={tabs[0].id} onTabChange={setActiveTab}>
      <Header />
      <main>
        <TabsContent />
      </main>
    </Tabs>
  );
}
