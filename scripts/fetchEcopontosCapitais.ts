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

// in kms
const CITY_RADIUS = 20000;

const CAPITAL_COORDS: Record<string, { lat: number; lng: number }> = {
  "São Paulo": { lat: -23.5505, lng: -46.6333 },
  "Rio de Janeiro": { lat: -22.9068, lng: -43.1729 },
  "Belo Horizonte": { lat: -19.9167, lng: -43.9345 },
  "Porto Alegre": { lat: -30.0346, lng: -51.2177 },
  Curitiba: { lat: -25.4284, lng: -49.2733 },
  Salvador: { lat: -12.9777, lng: -38.5016 },
  Brasília: { lat: -15.8267, lng: -47.9218 },
  Recife: { lat: -8.0476, lng: -34.877 },
  Fortaleza: { lat: -3.7319, lng: -38.5267 },
  Manaus: { lat: -3.119, lng: -60.0217 },
  Belém: { lat: -1.4558, lng: -48.4902 },
  Goiânia: { lat: -16.6869, lng: -49.2648 },
  "São Luís": { lat: -2.5307, lng: -44.3068 },
  Maceió: { lat: -9.6658, lng: -35.735 },
  Natal: { lat: -5.7945, lng: -35.211 },
  Teresina: { lat: -5.0892, lng: -42.8019 },
  "João Pessoa": { lat: -7.115, lng: -34.8641 },
  "Campo Grande": { lat: -20.4697, lng: -54.6201 },
  Cuiabá: { lat: -15.601, lng: -56.0974 },
  Vitória: { lat: -20.3155, lng: -40.3128 },
  Florianópolis: { lat: -27.5954, lng: -48.548 },
  Aracaju: { lat: -10.9472, lng: -37.0731 },
  Palmas: { lat: -10.1675, lng: -48.3277 },
  "Boa Vista": { lat: 2.8235, lng: -60.6758 },
  Macapá: { lat: 0.0349, lng: -51.0694 },
  "Porto Velho": { lat: -8.7608, lng: -63.8999 },
  "Rio Branco": { lat: -9.974, lng: -67.8243 },
};

async function fetchEcopontosByCity(city: string) {
  console.log(`🔎 Buscando ecopontos em ${city}...`);
  let nextPageToken: string | null = null;
  let page = 0;
  let url = "";

  do {
    if (page === 0) {
      // first call, with coordinates
      const coords = CAPITAL_COORDS[city];
      url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=ecoponto+reciclagem&location=${coords.lat},${coords.lng}&radius=${CITY_RADIUS}&key=${GOOGLE_API_KEY}`;
    } else {
      // next calls: only with page token
      url = `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${nextPageToken}&key=${GOOGLE_API_KEY}`;
      // Precisa aguardar 2s para o token ficar válido
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
