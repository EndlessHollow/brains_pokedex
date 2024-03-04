import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function Headline() {
  const router = useRouter();
  return (
    <div className="grid gap-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 transition-colors hover:text-neutral-300"
      >
        <ArrowLeftIcon className="w-4" />
        <p className="text-base">Back</p>
      </button>
      <h2 className="font-semibold text-3xl">Pokemon Detail</h2>
    </div>
  );
}
