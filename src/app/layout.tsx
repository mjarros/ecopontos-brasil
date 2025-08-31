import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Footer from "./_components/Footer/Footer";
import Header from "./_components/Header/Header";
import "./_styles/sections.scss";
import "./styles.scss";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Recicla Brasil",
  description: "Aqui você encontra facilmente uma listagem de ecopontos e reciclagens por cidade, disponibilizada pela API do Google Maps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${robotoMono.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
