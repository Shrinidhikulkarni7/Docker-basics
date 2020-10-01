export const fetcher = (url, method = 'GET', body = undefined) => {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }).then(res => res.json(), error => console.error(error) || null);
}
