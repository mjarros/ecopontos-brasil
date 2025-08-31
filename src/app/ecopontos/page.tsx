import { ReactNode } from "react";

type EcopontosPageProps = {
  children: ReactNode;
};

export default async function EcopontosPage({ children }: EcopontosPageProps) {
  return <>{children}</>;
}
