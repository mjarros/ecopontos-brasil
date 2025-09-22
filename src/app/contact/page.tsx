"use client";
import { motion } from "framer-motion";

export default function ContactPage() {
  const transitionSettings = {
    type: "tween" as const,
    duration: 0.8, // duração mais longa
    ease: "easeOut" as const,
  };

  return (
    <section className="section contact">
      <motion.h2 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ ...transitionSettings, delay: 0.05 }}>
        Contato
      </motion.h2>

      <motion.p initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ ...transitionSettings, delay: 0.1 }}>
        Esta página foi desenvolvida por Márcio Jarros.
      </motion.p>

      <motion.div className="container-linkedin" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ ...transitionSettings, delay: 0.15 }}>
        <a className="container-linkedin__linkedin-button" href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=marciojarros" target="_blank">
          👉🏻 Me siga no LinkedIn
        </a>
      </motion.div>
    </section>
  );
}
