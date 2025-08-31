"use client";

import { useRouter } from "next/navigation";
import { Form } from "react-bootstrap";

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
    <Form>
      <Form.Select onChange={(e) => handleSearch(e.target.value)} aria-label="Selecione a Cidade">
        {cities.map((city, key) => (
          <option value={city} key={key}>
            {city}
          </option>
        ))}
      </Form.Select>
    </Form>
  );
}
