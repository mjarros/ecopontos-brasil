import { Metadata } from "next";
import "./styles.scss";

export const metadata: Metadata = {
  title: "Contato do Ecopontos Brasil",
  description: "Informações de contato do Ecopontos Brasil.",
};

export default async function ContactPage() {
  return (
    <section className="section contact">
      <h2>Contato</h2>
      <p>Esta página foi desenvolvida por Márcio Jarros.</p>
      <div className="container-linkedin">
        <a className="container-linkedin__linkedin-button" href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=marciojarros" target="_blank">
          👉🏻 Me siga no LinkedIn
        </a>
      </div>
    </section>
  );
}
