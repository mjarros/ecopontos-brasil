import { supabase } from "@/lib/supabase";
import { FC } from "react";

export default async function CitiesPage({ params }: { params: { city: string } }) {
  const decodifiedCity = decodeURIComponent(params.city);
  const { data: ecopontos, error } = await supabase.from("ecopontos").select("*").ilike("cidade", decodifiedCity);

  if (error) {
    return <div>Erro ao carregar ecopontos</div>;
  }

  return (
    <div className="list-container">
      <h1 className="">Ecopontos e reciclagens em {decodeURIComponent(params.city)} 👇🏻</h1>
      {ecopontos && ecopontos.length > 0 ? (
        <ul className="">
          {ecopontos.map((ecoponto, key) => (
            <li key={ecoponto.id} className="">
              <Card key={key} address={ecoponto.endereco} name={ecoponto.nome} openAt={ecoponto.horario} telephone={ecoponto.telefone} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum ecoponto encontrado nesta cidade.</p>
      )}
    </div>
  );
}

type EcopontoCardProps = {
  name: string;
  address: string;
  openAt: string;
  telephone: string;
};

const Card: FC<EcopontoCardProps> = ({ name, address, openAt, telephone }) => {
  return (
    <div className="ecoponto-card">
      <h3>{name}</h3>
      <p>{address}</p>
      <p>{telephone && <p>📞 {telephone}</p>}</p>
      <p>{openAt && <p>🕒 {openAt}</p>}</p>
    </div>
  );
};
