"use client";

import { useRouter } from "next/navigation";
import { Form } from "react-bootstrap";
import "./SelectEcopontos.scss";

type SelectEcopontosProps = {
  cities: Array<string>;
};

export default function SelectEcopontos({ cities }: SelectEcopontosProps) {
  const router = useRouter();

  const handleSearch = (value: string) => {
    console.log(value);
    if (value.trim().toLocaleLowerCase()) {
      router.push(`/ecopontos/${encodeURIComponent(value)}`);
    }
  };

  return (
    <Form className="select-ecopontos">
      <div className="select-ecopontos__select-wrapper">
        <Form.Select className="select-wrapper__custom-select" onChange={(e) => handleSearch(e.target.value)} aria-label="Selecione a Cidade">
          {cities.map((city, key) => (
            <option value={city} key={key}>
              {city}
            </option>
          ))}
        </Form.Select>
      </div>
    </Form>
  );
}
