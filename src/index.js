import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { markupListCountry, markupItemCountry } from './markup';

const DEBOUNCE_DELAY = 300;

const refs = {
  search: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.search.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const countryName = refs.search.value.trim();
  if (countryName === '') {
    return clearInput();
  }
  fetchCountries(countryName)
    .then(country => {
      clearInput();
      if (country.length === 1) {
        refs.countryInfo.insertAdjacentHTML(
          'beforeend',
          markupItemCountry(country)
        );
      } else if (country.length >= 10) {
        info();
      } else {
        refs.countryList.insertAdjacentHTML(
          'beforeend',
          markupListCountry(country)
        );
      }
    })
    .catch(fail);
}

function info() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}
function fail() {
  Notify.failure('Oops, there is no country with that name');
}

function clearInput() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
