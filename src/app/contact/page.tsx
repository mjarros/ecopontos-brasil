import { Metadata } from "next";
import "./styles.scss";

export const metadata: Metadata = {
  title: "Contado do Recicla Brasil",
  description: "Informações de contato do Recicla Brasil.",
};

export default async function ContactPage() {
  return (
    <section className="section contact">
      <h2>Contato</h2>
      <p>Esta página foi criada e desenvolvida por Márcio Jarros.</p>
      <div>
        <a className="linkedin-button" href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=marciojarros" target="_blank">
          👉🏻 Me siga no LinkedIn
        </a>
      </div>
    </section>
  );
}
