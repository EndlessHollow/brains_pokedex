"use client";

import { useTabsContext } from "./context";
import TabsTrigger from "./tabs-trigger";

export default function TabsList() {
  const { items } = useTabsContext();

  return (
    <div
      className="flex flex-nowrap w-full gap-2 p-1.5 bg-default-100 rounded-md"
      role="tablist"
    >
      {items.map((item) => {
        return <TabsTrigger key={item.id} {...item} />;
      })}
    </div>
  );
}
