"use client";

import { Ecoponto } from "@/utils/types";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import { Form } from "react-bootstrap";

type EcopontosListContainerProps = {
  ecopontos: Array<Ecoponto>;
  city: string;
};

// Variants da lista para stagger
const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function EcopontosListContainer({ ecopontos, city }: EcopontosListContainerProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  const filteredEcopontos = ecopontos?.filter((e) => e.endereco.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div className="list-container">
      <Form className="list-container__neighborhood">
        <p>Digite parte do endereço...</p>
        <div className="custom-input-wrapper">
          <Form.Control className="custom-input" type="text" placeholder="Digite aqui..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </div>
      </Form>

      <h2>Ecopontos e reciclagens em até 20km de {city}</h2>
      <h3>Quantidade: {filteredEcopontos?.length} 👇🏻</h3>
      <p>* Quando disponível, o telefone é exibido. Dados com origem da API Google Maps.</p>

      {filteredEcopontos && filteredEcopontos.length > 0 ? (
        <motion.ul variants={listVariants} initial="hidden" animate="show" className="space-y-4">
          <AnimatePresence>
            {filteredEcopontos.map((ecoponto, index) => (
              <motion.li
                key={ecoponto.id}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -200 : 200,
                  rotate: index % 2 === 0 ? -10 : 10,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  rotate: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 120, damping: 15 },
                }}
                exit={{
                  opacity: 0,
                  x: index % 2 === 0 ? -200 : 200,
                  rotate: index % 2 === 0 ? -10 : 10,
                  scale: 0.8,
                  transition: { duration: 0.2 },
                }}
                layout
              >
                <Card address={ecoponto.endereco} name={ecoponto.nome} openAt={ecoponto.horario} telephone={ecoponto.telefone} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <p>Nenhum ecoponto encontrado nesta cidade.</p>
      )}
    </div>
  );
}

type EcopontoCardProps = {
  name: string;
  address: string;
  openAt: string | null;
  telephone: string | null;
};

const Card: FC<EcopontoCardProps> = ({ name, address, openAt, telephone }) => {
  return (
    <div className="ecoponto-card p-4 border rounded-lg shadow">
      <h3 className="font-semibold">{name}</h3>
      <p>Endereço: {address}</p>
      {telephone && <p>Telefone: {telephone}</p>}
      {/* {openAt && <p>🕒 {openAt}</p>} */}
    </div>
  );
};
