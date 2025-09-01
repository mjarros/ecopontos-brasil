import sofa from "@/public/sofa_at_street.jpg";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

export default function Home() {
  const heroLinks: Array<{
    child: ReactElement;
    path: string;
  }> = [
    {
      child: (
        <>
          👉🏻 <span>Buscar ecopontos e centros de reciclagem</span>
        </>
      ),
      path: "/ecopontos",
    },
    {
      child: (
        <>
          👉🏻 <span>Sobre o projeto</span>
        </>
      ),
      path: "/about",
    },
  ];
  return (
    <main>
      <section className="hero">
        <h2>Encontre o Ecoponto ou centro de reciclagem mais próximo</h2>
        <div className="hero__message">
          <p>O Ecopontos Brasil é para facilitar a sua vida.</p>
          <p> Contribua para sua comunidade, bairro e cidade ficarem mais limpos e sustentáveis.</p>
          <p className="message__planeta">
            <strong>O planeta te agradece 🌎.</strong>
          </p>
        </div>
        <div className="hero__sofa-street">
          <Image layout="responsive" src={sofa} alt="Sofá descartado inadequadamente na rua." height={500} width={500} />
        </div>
        <div className="click-search">
          <nav className="click-search__links-container">
            {heroLinks.map((item, key) => (
              <Link key={key} href={item.path}>
                {item.child}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}
