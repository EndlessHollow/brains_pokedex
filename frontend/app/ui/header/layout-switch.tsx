"use client";
import { usePokemons } from "@/app/lib/context";
import { Switch } from "@nextui-org/switch";
import { ViewColumnsIcon } from "@heroicons/react/16/solid";
import { QueueListIcon } from "@heroicons/react/16/solid";

export default function LayoutSwitch() {
  const { gridView, setGridView } = usePokemons();

  return (
    <Switch
      defaultSelected
      size="lg"
      color="secondary"
      isSelected={gridView}
      onValueChange={setGridView}
      thumbIcon={({ isSelected }) =>
        isSelected ? (
          <ViewColumnsIcon className={"w-4 h-4 text-gray-800"} />
        ) : (
          <QueueListIcon className={"w-4 h-4 text-gray-800"} />
        )
      }
    />
  );
}
