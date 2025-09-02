import EcopontosListContainer from "@/app/_components/EcopontosListContainer/EcopontosListContainer";
import { supabase } from "@/lib/supabase";

export default async function CitiesPage({ params }: { params: { city: string } }) {
  const decodifiedCity = decodeURIComponent(params.city);
  const { data: ecopontos, error } = await supabase.from("ecopontos").select("*").ilike("cidade", decodifiedCity);

  const sortedEcopontos = ecopontos ? [...ecopontos].sort((a, b) => a.cidade.localeCompare(b.cidade)) : [];

  if (error) {
    return <div>Erro ao carregar ecopontos</div>;
  }

  const city = decodeURIComponent(params?.city);

  return <EcopontosListContainer ecopontos={sortedEcopontos} city={city} />;
}
