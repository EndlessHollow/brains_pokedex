import { FaceFrownIcon } from "@heroicons/react/24/solid";
import { cn } from "@nextui-org/system-rsc";

type Props = {
  headline: string;
  content: string;
  className?: string;
};

export default function NoData(props: Props) {
  const { headline, content, className } = props;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6 text-center h-[calc(100vh-17.5rem)] sm:h-[calc(100vh-11.5rem)]",
        className,
      )}
    >
      <FaceFrownIcon className="w-24" />
      <div className="grid gap-1">
        <h2 className="text-xl font-semibold">{headline}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}
