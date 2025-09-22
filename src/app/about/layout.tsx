import type { Metadata } from "next";
import "./styles.scss";

export const metadata: Metadata = {
  title: "Sobre - Ecopontos Brasil",
  description: "Informações sobre o projeto Ecopontos Brasil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
