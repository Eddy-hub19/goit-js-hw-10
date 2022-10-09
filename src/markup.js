export function markupListCountry(country) {
  const layoutCountryList = country.map(({ name, flags }) => {
    return /*html*/ `
          <li class="country-list-item">
              <img class="country-flags" width="30" height="30" src="${flags.svg}" alt="flag of ${name.official}">
              <h2 class="country-list-name">${name.official}</h2>
          </li>`;
  });
  return layoutCountryList.join('');
}

export function markupItemCountry(country) {
  const markupItem = country.map(
    ({ name, capital, population, flags, languages }) => {
      const lang = Object.keys(languages);
      return /*html*/ `
      <li class="country-info-item">
          <h2 class="country-info-title">name: ${name.official}</h2>
          <p class="country-info-capital">capital: ${capital}</p>
          <div class="country-info-population">population: ${population}</div>
          <img width="120" height="120" src="${flags.svg}" alt="flag of ${name.official}">
          <span class="country-info-lang">lang: ${lang}</span>
      </li>`;
    }
  );
  return markupItem.join('');
}
