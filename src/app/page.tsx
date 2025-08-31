import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <h2>Encontre o Ecoponto ou centro de reciclagem mais próximo</h2>
        <div className="hero__message">
          <p>Contribua para seu bairro e cidade ficarem mais limpos e sustentáveis.</p>
          <p>Não pense apenas em você, pense nos outros e no meio ambiente.</p>
          <p>
            <strong>O planeta te agradece 🌎.</strong>
          </p>
        </div>
        <div className="click-search">
          <Link href={"/ecopontos"}>
            👉🏻 <span>Buscar ecopontos e centros de reciclagem</span>
          </Link>
          <Link href={"/about"}>
            👉🏻 <span>Sobre o projeto</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
