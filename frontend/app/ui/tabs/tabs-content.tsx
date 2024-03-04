"use client";

import { useTabsContext } from "./context";

export default function TabsContent() {
  const { activeContent } = useTabsContext();

  if (!activeContent) {
    return null;
  }

  return activeContent;
}
