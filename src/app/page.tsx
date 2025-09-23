"use client";

import sofa from "@/public/sofa_at_street.jpg";
import { motion } from "framer-motion";
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

  // Variants para entrada lateral com fade
  const itemVariants = {
    hiddenLeft: { opacity: 0, x: -50 },
    hiddenRight: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0 },
  };

  const transitionSettings = {
    type: "tween" as const,
    duration: 0.8,
    ease: "easeOut" as const,
  };

  return (
    <main>
      <section className="hero">
        {/* Título */}
        <motion.h2 initial="hiddenLeft" animate="show" variants={itemVariants} transition={{ ...transitionSettings, delay: 0.1 }}>
          Busque e encontre o Ecoponto ou centro de reciclagem mais próximo de você
        </motion.h2>

        {/* Mensagem */}
        <motion.div className="hero__message" initial="hiddenLeft" animate="show" variants={itemVariants} transition={{ ...transitionSettings, delay: 0.3 }}>
          <p>Através da API do Google Maps e de geoposicionamento, você encontra os ecopontos das capitais e principais cidades do Brasil.</p>
          <p>Desta forma, você contribui para sua cidade, bairro e comunidade ficarem mais limpos.</p>
          <p>O Ecopontos Brasil é para facilitar a sua vida.</p>
        </motion.div>

        {/* Imagem */}
        <motion.div className="hero__sofa-street" initial="hiddenRight" animate="show" variants={itemVariants} transition={{ ...transitionSettings, delay: 0.5 }}>
          <Image layout="responsive" src={sofa} alt="Sofá descartado inadequadamente na rua." height={500} width={500} />
        </motion.div>

        {/* Links */}
        <motion.div className="click-search" initial="hiddenLeft" animate="show" variants={itemVariants} transition={{ ...transitionSettings, delay: 0.7 }}>
          <nav className="click-search__links-container">
            {heroLinks.map((item, key) => (
              <Link key={key} href={item.path}>
                {item.child}
              </Link>
            ))}
          </nav>
          <p className="message__planeta">
            <strong>🌎 O planeta te agradece. 🌎</strong>
          </p>
        </motion.div>
      </section>
    </main>
  );
}
