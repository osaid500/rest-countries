const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get("country");

const container = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("../data.json");
  const data = await response.json();

  const selectedCountry = data.find(
    (country) => country.alpha3Code.toLowerCase() === countryName
  );
  let borderCountriesContainerHTML;

  if (selectedCountry.borders) {
    borderCountries = data.filter((country) =>
      selectedCountry.borders.slice(0, 3).includes(country.alpha3Code)
    );

    const borderCountriesContainer = document.createElement("div");
    borderCountriesContainer.classList.add("border-countries");

    borderCountries.map((el) => {
      const borderButton = document.createElement("a");
      borderButton.href = `/pages/details.html?country=${el.alpha3Code}`;
      borderButton.textContent = el.name;
      borderCountriesContainer.appendChild(borderButton);
      borderCountriesContainerHTML = borderCountriesContainer.outerHTML;
    });
  } else {
    borderCountriesContainerHTML = "No border countries found";
  }

  populate(selectedCountry, borderCountriesContainerHTML);
});

function populate(country, borderCountriesContainerHTML) {
  const {
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
  } = country;

  function stringifyArray(array) {
    if (!array) return "None";
    return array.map((el) => el.name).join(", ");
  }

  container.innerHTML = ` <img src="${country.flag}" alt="country flag" />
      <section class="details">
        <h2>${country.name}</h2>
        <div class="details-container">
          <div>
            <p><strong>Native Name: </strong>${nativeName || "None"}</p>
            <p><strong>Population: </strong>${population.toLocaleString()}</p>
            <p><strong>Region: </strong>${region || "None"}</p>
            <p><strong>Sub Region: </strong>${subregion || "None"}</p>
            <p><strong>Capital: </strong>${capital || "None"}</p>
          </div>
          <div>
            <p><strong>Top Level Domain: </strong>${
              topLevelDomain || "None"
            }</p>
            <p><strong>Currencies: </strong>${stringifyArray(currencies)}</p>
            <p><strong>Languages: </strong>${stringifyArray(languages)}</p>
          </div>
          <div class="border">
            <h3>Border Countries:</h3>
            ${borderCountriesContainerHTML}
          </div>
        </div>
      </section>`;
}
