const urlParams = new URLSearchParams(window.location.search);
const region = urlParams.get("region") && urlParams.get("region").toLowerCase();
const query = urlParams.get("query") && urlParams.get("query").toLowerCase();

const countryList = document.querySelector(".country-list");
const dropdownButton = document.querySelector("#dropdownMenuButton");
const optionsContainer = document.querySelector("#optionsList");
const options = optionsContainer.querySelectorAll("a");

async function fetchData() {
  const response = await fetch("./data.json");
  const data = await response.json();

  function findCountry(data) {
    return data.filter((country) => country.name.toLowerCase().includes(query));
  }

  console.log(findCountry(data));

  const countries = query
    ? findCountry(data)
    : region
    ? data.filter((country) => country.region.toLowerCase() === region)
    : data;

  if (!countries.length) {
    const error = document.createElement("h1");
    error.textContent = "No countries to show 🚫";
    countryList.appendChild(error);
    return;
  }

  // const queryCountries = console.log(queryCountries, query);

  populate(countries);
}

fetchData();

function expandOptions() {
  optionsContainer.classList.toggle("active");
  if (optionsContainer.classList.contains("active")) {
    options.forEach((option) => (option.tabIndex = "0"));
    this.ariaExpanded = true;
  } else {
    options.forEach((option) => (option.tabIndex = "-1"));
    this.ariaExpanded = false;
  }
}

// document.addEventListener("DOMContentLoaded", async () => {});

function populate(countries) {
  countries.map((country, index) => {
    const countryCard = document.createElement("article");
    // <article class="country-card">
    countryCard.classList.add("country-card");
    countryCard.innerHTML = `
          <a class="image-container" href="/pages/details.html?country=${
            country.alpha3Code
          }">
            <img src="${country.flag}" alt="country flag" loading="lazy" />
          </a>
          <div class="country-card-info">
            <a href="/pages/details.html?country=${country.alpha3Code}">
              <h2 class="country-card-title">${country.name}</h2>
            </a>
            <ul>
              <li>
                <strong>Population:</strong>
                <span>${country.population.toLocaleString()}</span>
              </li>
              <li>
                <strong>Region:</strong>
                <span>${country.region}</span>
              </li>
              <li>
                <strong>Capital:</strong>
                <span>${country.capital}</span>
              </li>
            </ul>
          </div>`;
    setTimeout(() => {
      countryList.appendChild(countryCard);
    }, index * 200);
  });
}

dropdownButton.addEventListener("click", expandOptions);
