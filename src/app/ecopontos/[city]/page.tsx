import { supabase } from "@/lib/supabase";

export default async function CitiesPage({ params }: { params: { city: string } }) {
  const decodifiedCity = decodeURIComponent(params.city);
  const { data: ecopontos, error } = await supabase.from("ecopontos").select("*").ilike("cidade", decodifiedCity);

  if (error) {
    return <div>Erro ao carregar ecopontos</div>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ecopontos e reciclagens em {decodeURIComponent(params.city)}</h1>
      {ecopontos && ecopontos.length > 0 ? (
        <ul className="space-y-4">
          {ecopontos.map((ecoponto) => (
            <li key={ecoponto.id} className="border p-4 rounded shadow">
              <h2 className="font-semibold text-lg">{ecoponto.nome}</h2>
              <p>{ecoponto.endereco}</p>
              {ecoponto.telefone && <p>📞 {ecoponto.telefone}</p>}
              {ecoponto.horario && <p>🕒 {ecoponto.horario}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum ecoponto encontrado nesta cidade.</p>
      )}
    </main>
  );
}
