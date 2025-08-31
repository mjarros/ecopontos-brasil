import ActiveLink from "../ActiveLink/ActiveLink";
import "./HeaderStyles.scss";

export default function Header() {
  const headerTags: Array<{
    tag: string;
    path: string;
  }> = [
    {
      tag: "Início",
      path: "/",
    },
    {
      tag: "Buscar",
      path: "/ecopontos",
    },
    {
      tag: "Sobre",
      path: "/about",
    },
    {
      tag: "Contato",
      path: "/contact",
    },
  ];
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Recicla Brasil</h1>
        <nav className="nav">
          {headerTags.map((header, key) => (
            <ActiveLink key={key} href={header.path} activeClassName="active-link" className="link">
              <span>{header.tag}</span>
            </ActiveLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
