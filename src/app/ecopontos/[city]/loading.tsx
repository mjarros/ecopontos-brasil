import Spinner from "react-bootstrap/Spinner";

export default function Loading() {
  return (
    <div className="loading">
      <Spinner variant="primary" animation="border" />
      <p className="loading__text">Carregando dados...</p>
    </div>
  );
}
