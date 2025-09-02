"use client";

import { FC, useState } from "react";
import { Form } from "react-bootstrap";

export default function EcopontosListContainer({ ecopontos, city }) {
  const [searchValue, setSearchValue] = useState<string>();
  return (
    <div className="list-container">
      <Form className="list-container__neighborhood">
        <p>Se quiser, digite seu bairro...</p>
        <div className="custom-input-wrapper">
          <Form.Control className="custom-input" type="text" placeholder="Digite aqui..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </div>
      </Form>

      <h2>
        Ecopontos e reciclagens em até 20km de {city}: {ecopontos?.length} 👇🏻
      </h2>
      <p>* Quando disponível, o telefone é exibido. Dados com origem da API Google Maps.</p>
      {ecopontos && ecopontos?.length > 0 ? (
        <ul className="">
          {ecopontos?.map((ecoponto, key) => (
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
      <p>Endereço: {address}</p>
      <p>{telephone && <p>Telefone: {telephone}</p>}</p>
      {/* <p>{openAt && <p>🕒 {openAt}</p>}</p> */}
    </div>
  );
};
