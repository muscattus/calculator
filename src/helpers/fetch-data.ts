export async function fetchData(url: string, method: string, headers: any, body?: any) {
  const rawData = await fetch(url, {method, headers, body})
  const jsonData = await rawData.json()
  return jsonData;
}