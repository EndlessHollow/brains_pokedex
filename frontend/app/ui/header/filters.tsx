"use client";
import { usePokemons } from "@/app/lib/context";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";

export default function Filters() {
  const {
    pokemonTypes,
    pokemonType,
    searchTerm,
    setSearchTerm,
    handleSelectType,
    handleSearch,
  } = usePokemons();

  return (
    <>
      <Input
        placeholder="Type to search..."
        size="sm"
        className="bg-transparent"
        value={searchTerm}
        onValueChange={handleSearch}
        isClearable
        onClear={() => setSearchTerm("")}
      />
      <Select
        label="Select a pokemon type"
        size="sm"
        className="transpare"
        selectedKeys={[pokemonType]}
        onChange={(e) => handleSelectType(e.target.value)}
        popoverProps={{ shouldBlockScroll: true }}
      >
        {pokemonTypes.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </Select>
    </>
  );
}
