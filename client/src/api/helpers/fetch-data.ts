export async function fetchData(url: string, method: string, headers: any, body?: any) {
  const response = await fetch(url, {method, headers, body})
  const jsonData = await response.json()
  if (response.ok) {
    return jsonData;
  } else {
    throw ({
      status: response.status,
      message: jsonData.message,
      errorName: jsonData.name
    });
  }
}

// export async function fetcher(url: string, method: string, headers: any, body?: any) {
//   fetch(url, {method, headers, body}).then((response) => {
//     if (response.ok) {
//       return response.json();
//     }
//     throw (response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// }