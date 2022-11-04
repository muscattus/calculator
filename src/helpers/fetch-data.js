import { BASE_URL } from "../api/constants";

export async function fetchData(method, headers, body) {
  console.log(`${BASE_URL}evaluate`);
  const rawData = await fetch(`${BASE_URL}evaluate`, {method, headers, body})
  const jsonData = await rawData.json()
  return jsonData;
}