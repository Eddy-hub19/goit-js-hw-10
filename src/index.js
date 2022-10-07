import './css/styles.css';

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  listRef: document.querySelector('.country-list'),
  itemRef: document.querySelector('.country-info'),
};

function fetchCountries(name) {
  fetch('https://restcountries.com/v3.1/name/united')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    //   .then(markup)
    .then(data => {
      markupItem(data);
      Notify.success('Yes');
    })
    .catch(error => {
      console.log(error);
      Notify.failure('No');
    });
}

refs.input.addEventListener('input', onClickInput);

function onClickInput(event) {
  event.preventDefault();

  const inputTarget = event.currentTarget.value;
  // refs.listRef.innerHTML = inputTarget;

  if (inputTarget.length === 2) {
    fetchCountries();
  } else {
    Notify.failure('No');
  }
}

// function markup(data) {
//   const mapData = data.map(
//     ({ name, capital, population, flags, languages }) => {
//       return /*html*/ `
//             <h2>${name.official}</h2>
//             <p>${capital}</p>
//             <div>${population}</div>
//             <img class="country-flag" src="${flags.svg}" alt="">
//             <span>${languages.spa}</span>`;
//     }
//   );
//   refs.itemRef.innerHTML = mapData;
// }

function markupItem(data) {
  const createMarkup = data.map(({ name, flags }) => {
    return /*html*/ `
          <li class="list-item">
            <h2 class="country-name">${name.official}</h2>
            <img width="30" height="30" src="${flags.svg}" alt="">
          </li>`;
  });
  refs.listRef.innerHTML = createMarkup.join('');
}
