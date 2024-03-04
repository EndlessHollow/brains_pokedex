import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <main className="h-[calc(100vh-3rem)] flex flex-col gap-6 items-center justify-center">
      <FaceFrownIcon className="w-24" />
      <div className="grid gap-1">
        <h2 className="text-xl font-semibold">404 Not Found</h2>
        <p>Could not find the requested pokemon</p>
      </div>
      <Link
        href="/"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
