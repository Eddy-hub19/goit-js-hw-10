const baseUrl = 'https://restcountries.com/v3.1/name/';
const fields = 'name,capital,population,flags,languages';

export function fetchCountries(name) {
  const url = `${baseUrl}${name}?fields=${fields}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}