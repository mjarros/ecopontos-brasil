import type { Metadata } from "next";
import "./styles.scss";

export const metadata: Metadata = {
  title: "Contato - Ecopontos Brasil",
  description: "Informações de contato do Ecopontos Brasil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
