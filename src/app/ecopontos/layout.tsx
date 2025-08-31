import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import { ReactNode } from "react";
import SelectEcopontos from "../_components/SelectEcopontos/SelectEcopontos";

type EcopontosPageProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Ecopontos e Reciclagens por Cidade",
  description: "Lista de ecopontos e reciclagens por cidade, disponibilizada pela API do Google Maps.",
};

export default async function EcopontosLayout({ children }: EcopontosPageProps) {
  const { data: ecopontos, error } = await supabase.from("ecopontos").select("*");

  const cities: Array<string> = Array.from(new Set<string>(ecopontos?.map((ecoponto) => ecoponto.cidade)));

  if (error) {
    return <div>Erro ao carregar ecopontos</div>;
  }

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Selecione a Cidade</h1>
      <SelectEcopontos cities={cities} />
      {children}
    </section>
  );
}
