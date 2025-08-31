import { Metadata } from "next";
import "./styles.scss";

export const metadata: Metadata = {
  title: "Sobre o Recicla Brasil",
  description: "Informações sobre o Recicla Brasil.",
};

export default async function AboutPage() {
  return (
    <section className="section about">
      <h2>Sobre o Recicla Brasil</h2>
      <p>
        O <strong>Recicla Brasil</strong> é um projeto sem fins lucrativos que nasceu com a missão de facilitar o acesso da população aos locais de descarte correto de resíduos recicláveis.
      </p>
      <p>Acreditamos que pequenas atitudes, como encontrar o ponto de coleta mais próximo, podem gerar grandes impactos ambientais e sociais. Nossa motivação é contribuir para cidades mais limpas e sustentáveis, oferecendo uma plataforma simples e acessível para todos.</p>
    </section>
  );
}
