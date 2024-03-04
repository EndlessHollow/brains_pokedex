"use client";

import { TabsCtxProvider } from "./context";
import { TTab } from "./types";
import { ReactNode, useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Props = {
  tabs: TTab[];
  defaultTab?: string;
  children: ReactNode;
  onTabChange?: (value: string) => void;
};

export default function Tabs(props: Props) {
  const { tabs, defaultTab, children, onTabChange } = props;

  const searchParams = useSearchParams();

  const preselectedTab = searchParams.get("tab");
  const isValidTab = Boolean(
    preselectedTab && tabs.some((tab) => tab.id === preselectedTab),
  );

  const initialTab =
    tabs.find((tab) => tab.id === defaultTab)?.id || tabs[0].id;

  const activeTab = isValidTab && preselectedTab ? preselectedTab : initialTab;

  const items = tabs.map((tab) => {
    return {
      ...tab,
      isActive: tab.id === activeTab,
    };
  });

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.component;

  useEffect(() => {
    onTabChange?.(activeTab);
  }, [activeTab, onTabChange]);

  return (
    <TabsCtxProvider
      items={items}
      activeContent={activeContent}
      onTabChange={onTabChange}
    >
      {children}
    </TabsCtxProvider>
  );
}
