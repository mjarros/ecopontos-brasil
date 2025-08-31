import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
import fetch from "node-fetch";

type PlaceSearchResponse = {
  results?: {
    place_id: string;
    name: string;
    formatted_address: string;
  }[];
  next_page_token?: string;
};

type PlaceDetailsResponse = {
  result?: {
    formatted_phone_number?: string;
    opening_hours?: { weekday_text: string[] };
    geometry?: { location: { lat: number; lng: number } };
  };
};

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;

const CAPITALS = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Porto Alegre", "Curitiba", "Salvador", "Brasília", "Recife", "Fortaleza", "Manaus", "Belém", "Goiânia", "São Luís", "Maceió", "Natal", "Teresina", "João Pessoa", "Campo Grande", "Cuiabá", "Vitória", "Florianópolis", "Aracaju", "Palmas", "Boa Vista", "Macapá", "Porto Velho", "Rio Branco"];

async function fetchEcopontosByCity(city: string) {
  console.log(`🔎 Buscando ecopontos em ${city}...`);
  let nextPageToken: string | null = null;
  let page = 0;
  let url = "";

  do {
    if (page === 0) {
      // First fetch with query
      url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=ecoponto+reciclagem+${encodeURIComponent(city)}&key=${GOOGLE_API_KEY}`;
    } else {
      // Next fetches then with pagetoken
      url = `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${nextPageToken}&key=${GOOGLE_API_KEY}`;

      // Need to wait 2s because the token takes time to become valid.
      await new Promise((res) => setTimeout(res, 2000));
    }

    const res = await fetch(url);
    const data = (await res.json()) as PlaceSearchResponse;

    if (!data.results) break;

    for (const place of data.results) {
      // Check if exists in supabase
      const { data: existing } = await supabase.from("ecopontos").select("google_place_id").eq("google_place_id", place.place_id).single();

      let telefone = null;
      let horario = null;
      let location = null;

      // if it doesnt, get details
      if (!existing) {
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,formatted_phone_number,opening_hours,geometry&key=${GOOGLE_API_KEY}`;
        const detailsRes = await fetch(detailsUrl);
        const details = (await detailsRes.json()) as PlaceDetailsResponse;
        const ecopontoDetails = details.result;

        if (ecopontoDetails) {
          telefone = ecopontoDetails.formatted_phone_number || null;
          horario = ecopontoDetails.opening_hours?.weekday_text?.join("; ") || null;
          location = ecopontoDetails.geometry?.location || null;
        }
      }

      // upsert in Supabase
      try {
        await supabase.from("ecopontos").upsert(
          {
            google_place_id: place.place_id,
            nome: place.name,
            endereco: place.formatted_address,
            telefone,
            horario,
            cidade: city,
            latitude: location?.lat || null,
            longitude: location?.lng || null,
            atualizado_em: new Date(),
          },
          { onConflict: "google_place_id" }
        );
      } catch (error: unknown) {
        throw new Error(`Supabase error`);
      }
    }

    nextPageToken = data.next_page_token || null;
    page++;
  } while (nextPageToken && page < 3); // limit search to 3 pages by city
}

async function monthly() {
  for (const city of CAPITALS) {
    await fetchEcopontosByCity(city);
  }
  console.log("✅ Atualização mensal concluída.");
}

monthly();
