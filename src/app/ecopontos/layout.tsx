import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import { ReactNode } from "react";
import SelectEcopontos from "../_components/SelectEcopontos/SelectEcopontos";
import "./styles.scss";

type EcopontosPageProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Busca por cidade - Ecopontos Brasil",
  description: "Lista de ecopontos e reciclagens por cidade, disponibilizada pela API do Google Maps.",
};

export default async function EcopontosLayout({ children }: EcopontosPageProps) {
  const { data: ecopontos, error } = await supabase.from("ecopontos").select("*");

  const cities: Array<string> = Array.from(new Set<string>(ecopontos?.map((ecoponto) => ecoponto.cidade))).sort((a, b) => a.localeCompare(b));

  if (error) {
    return <div>Erro ao carregar ecopontos</div>;
  }

  return (
    <section className="section ecopontos">
      <div className="ecopontos__select">
        <h1>Primeiro, selecione a cidade... </h1>
        <SelectEcopontos cities={cities} />
      </div>
      {children}
    </section>
  );
}
