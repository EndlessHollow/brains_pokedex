"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";
import { ApolloWrapper } from "./lib/apollo-provider";

type Props = {
  children: ReactNode;
};

export function Providers(props: Props) {
  const { children } = props;
  return (
    <ApolloWrapper>
      <NextUIProvider>{children}</NextUIProvider>
    </ApolloWrapper>
  );
}
