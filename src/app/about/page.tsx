"use client";

import framerMotionImage from "@/public/framer-motion-logo.svg";
import gitHubImage from "@/public/gitHub.svg";
import nextImage from "@/public/next.svg";
import SassImage from "@/public/sass.svg";
import supabaseImage from "@/public/supabase.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import { FC, ReactElement } from "react";
import "./styles.scss";

export default function AboutPage() {
  const technologiesList: Array<{
    name: string;
    description: string;
    image: ReactElement;
  }> = [
    {
      name: "Next",
      description: "É um framework full-stack, de ponta, que conta com Server Side Rendering e React Components. A utilização do Next permite maior performance da aplicação bem como ótimo SEO.",
      image: <Image src={nextImage} alt="Next Image" height={96} width={96} />,
    },
    {
      name: "GitHub Actions",
      description: "No GitHub, tem um 🤖 que nunca dorme, e todo mês coleta dados das cidades e armazena no Supabase, para que você possa consultar.",
      image: <Image src={gitHubImage} alt="GitHub Image" height={96} width={96} />,
    },
    {
      name: "Supabase",
      description: "Dados gerados pelo 🤖 são armazenados no Supabase, que conta com banco de dados PostgreSQL e APIs automáticas.",
      image: <Image src={supabaseImage} alt="Supabase Image" height={96} width={96} />,
    },
    {
      name: "Sass",
      description: "Sass ao invés de Tailwind porque é menos verboso e deixa o JSX mais limpo.",
      image: <Image src={SassImage} alt="Sass Image" height={96} width={96} />,
    },
    {
      name: "Framer Motion",
      description: "Framer Motion é uma biblioteca de animação de código aberto para React que permite aos desenvolvedores criar animações, transições e efeitos de interação de forma simples e fluida em aplicações web.",
      image: <Image src={framerMotionImage} alt="Framer Motion Image" height={96} width={96} />,
    },
  ];

  const transitionSettings = {
    type: "tween" as const,
    duration: 0.8,
    ease: "easeOut" as const,
  };

  return (
    <section className="section about">
      {/* Título principal */}
      <motion.h2 initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ ...transitionSettings, delay: 0.1 }}>
        Sobre o Ecopontos Brasil 🇧🇷 📖 🌎
      </motion.h2>

      {/* Parágrafos */}
      {["O Ecopontos Brasil é um projeto despretencioso e sem fins lucrativos que nasceu com a missão de facilitar o acesso da população aos locais de descarte correto para resíduos.", "Muitas vezes estas informações não são bem divulgadas pelas prefeituras, o que as torna difíceis de serem encontratas.", "Quero ajudar na luta por ruas limpas e bem cuidadas, acreditando que pequenas atitudes, como encontrar o ponto de coleta mais próximo, pode ajudar na destinação correta e gerar grandes impactos ambientais e sociais.", "Minha principal motivação é contribuir para cidades mais limpas e sustentáveis, oferecendo uma plataforma simples e acessível para todos."].map((text, idx) => (
        <motion.p key={idx} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ ...transitionSettings, delay: 0.2 + idx * 0.2 }}>
          {text}
        </motion.p>
      ))}

      {/* Seção Origem dos Ecopontos */}
      <motion.h2 initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ ...transitionSettings, delay: 1.2 }}>
        Origem dos Ecopontos 🧐💡
      </motion.h2>

      <motion.p initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ ...transitionSettings, delay: 1.4 }}>
        Os ecopontos são sustentados pela Política Nacional de Resíduos Sólidos (PNRS), Lei nº 12.305/2010, que estabelece diretrizes para o manejo adequado dos resíduos sólidos no Brasil, incluindo a infraestrutura para coleta e destinação final.
      </motion.p>

      <motion.p initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ ...transitionSettings, delay: 1.6 }}>
        Além da lei federal, a criação e regulamentação dos ecopontos também é amparada por leis municipais, que detalham o funcionamento e os tipos de materiais recebidos em cada local.
      </motion.p>

      <motion.p initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ ...transitionSettings, delay: 1.8 }}>
        <a target="_blank" href="https://antigo.mma.gov.br/cidades-sustentaveis/residuos-solidos/politica-nacional-de-residuos-solidos.html">
          👉🏻 Veja mais sobre a Política Nacional de Resíduos Sólidos (PNRS).
        </a>
      </motion.p>

      {/* Tecnologias */}
      <motion.h2 initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ ...transitionSettings, delay: 2 }}>
        Tecnologias utilizadas neste projeto 💻 👇🏻
      </motion.h2>

      <motion.ul
        className="about__technologies"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          show: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {technologiesList.map((item, idx) => (
          <motion.li key={idx} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ ...transitionSettings, delay: 2 + idx * 0.2 }}>
            <Card image={item.image} name={item.name} description={item.description} />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

type TechnologyCardProps = {
  name: string;
  description: string;
  image: ReactElement;
};

const Card: FC<TechnologyCardProps> = ({ name, description, image }) => {
  return (
    <div className="technology-card">
      {image && image}
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};
