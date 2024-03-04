"use client";

import { ReactNode, createContext, useContext } from "react";

type TTabItem = {
  id: string;
  label: string;
  isActive: boolean;
};

type CtxProps = {
  items: TTabItem[];
  activeContent: ReactNode;
  onTabChange?: (value: string) => void;
};

type Props = {
  items: TTabItem[];
  activeContent: ReactNode;
  children: ReactNode;
  onTabChange?: (value: string) => void;
};

export const TabsCtx = createContext<CtxProps | undefined>(undefined);

export function useTabsContext() {
  const ctx = useContext(TabsCtx);

  if (ctx === undefined) {
    throw new Error("Context must be used in component boundaries");
  }

  return ctx;
}

export function TabsCtxProvider(props: Props) {
  const { activeContent, items, children, onTabChange } = props;

  const value = { activeContent, items, onTabChange };

  return <TabsCtx.Provider value={value}>{children}</TabsCtx.Provider>;
}
