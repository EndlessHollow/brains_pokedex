import { PokemonsProvider } from "./lib/context";
import PageContent from "./page-content";

export default async function Page() {
  return (
    <div className="grid gap-y-6">
      <PokemonsProvider>
        <PageContent />
      </PokemonsProvider>
    </div>
  );
}
