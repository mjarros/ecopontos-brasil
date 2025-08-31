import "./FooterStyles.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Recicla Brasil. Todos os direitos reservados.</p>
    </footer>
  );
}
