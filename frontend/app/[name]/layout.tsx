import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout(props: Props) {
  const { children } = props;
  return (
    <div className="relative max-w-7xl mx-auto flex flex-col p-6">
      {children}
    </div>
  );
}
