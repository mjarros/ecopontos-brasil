import ActiveLink from "../ActiveLink/ActiveLink";
import "./HeaderStyles.scss";

export default function Header() {
  const headerLinks: Array<{
    mensagem: string;
    path: string;
  }> = [
    {
      mensagem: "Início",
      path: "/",
    },
    {
      mensagem: "Buscar",
      path: "/ecopontos",
    },
    {
      mensagem: "Sobre",
      path: "/about",
    },
    {
      mensagem: "Contato",
      path: "/contact",
    },
  ];
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Ecopontos Brasil 🇧🇷</h1>
        <nav className="nav">
          {headerLinks.map((header, key) => (
            <ActiveLink key={key} href={header.path} activeClassName="active-link">
              <span className="link">{header.mensagem}</span>
            </ActiveLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
