import gitHubImage from "@/public/gitHub.svg";
import nextImage from "@/public/next.svg";
import SassImage from "@/public/sass.svg";
import supabaseImage from "@/public/supabase.svg";
import { Metadata } from "next";
import Image from "next/image";
import { FC, ReactElement } from "react";
import "./styles.scss";

export const metadata: Metadata = {
  title: "Sobre o Ecopontos Brasil",
  description: "Informações sobre o Ecopontos Brasil e o projeto.",
};

export default async function AboutPage() {
  const technologiesList: Array<{
    name: string;
    description: string;
    image: ReactElement;
  }> = [
    {
      name: "Next",
      description: "Por ser um framework full-stack, de ponta, que conta com Server Side Rendering e React Components. A utilização do Next permite maior performance da aplicação bem como ótimo SEO.",
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
  ];

  return (
    <section className="section about">
      <h2>Sobre o Ecopontos Brasil 🇧🇷 📖 🌎</h2>
      <p>
        O <strong>Ecopontos Brasil</strong> é um projeto despretencioso e sem fins lucrativos que nasceu com a missão de facilitar o acesso da população aos locais de descarte correto de resíduos recicláveis.
      </p>
      <p>Pequenas atitudes, como encontrar o ponto de coleta mais próximo, podem gerar grandes impactos ambientais e sociais.</p>

      <p>A principal motivação é contribuir para cidades mais limpas e sustentáveis, oferecendo uma plataforma simples e acessível para todos.</p>

      <h2>Curiosidades 🧐💡</h2>

      <p>Os ecopontos são sustentados pela Política Nacional de Resíduos Sólidos (PNRS), Lei nº 12.305/2010, que estabelece diretrizes para o manejo adequado dos resíduos sólidos no Brasil, incluindo a infraestrutura para coleta e destinação final.</p>

      <p>Além da lei federal, a criação e regulamentação dos ecopontos também é amparada por leis municipais, que detalham o funcionamento e os tipos de materiais recebidos em cada local.</p>

      <h2>Tecnologias utilizadas 💻 👇🏻</h2>

      <ul className="about__technologies">
        {technologiesList.map((item, key) => (
          <li key={key}>
            <Card image={item.image} name={item.name} description={item.description} />
          </li>
        ))}
      </ul>
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
