"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { dataAttr } from "@nextui-org/shared-utils";
import { useTabsContext } from "./context";

type Props = {
  id: string;
  label: string;
  isActive: boolean;
};

export default function TabsTrigger(props: Props) {
  const { id, label, isActive } = props;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { onTabChange } = useTabsContext();

  function handleSelect() {
    const params = new URLSearchParams(searchParams);

    onTabChange?.(id);

    params.set("tab", id);

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <button
      type="button"
      role="tab"
      tabIndex={0}
      onClick={handleSelect}
      className={
        "z-0 w-full px-3 py-1 flex group relative justify-center items-center cursor-pointer h-9 rounded-medium"
      }
      data-selected={dataAttr(isActive)}
    >
      {isActive && (
        <motion.div
          className="absolute z-0 inset-0 rounded-small bg-background dark:bg-default shadow-medium transform: none; transform-origin: 50% 50% 0px;"
          layoutDependency={false}
          layoutId="active-tab"
          transition={{
            type: "spring",
            bounce: 0.15,
            duration: 0.5,
          }}
        />
      )}
      <span className="relative z-10 whitespace-nowrap transition-colors text-default-500 group-data-[selected=true]:text-default-foreground">
        {label}
      </span>
    </button>
  );
}
