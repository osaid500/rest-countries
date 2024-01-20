const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get("country");

const container = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();

  const selectedCountry = data.find((country) => country.cca3 === countryName);
  let borderCountriesContainerHTML;

  if (selectedCountry.borders) {
    borderCountries = data.filter((country) =>
      selectedCountry.borders.slice(0, 3).includes(country.cca3)
    );

    const borderCountriesContainer = document.createElement("div");
    borderCountriesContainer.classList.add("border-countries");

    borderCountries.map((el) => {
      const borderButton = document.createElement("a");
      borderButton.href = `/pages/details.html?country=${el.cca3}`;
      borderButton.textContent = el.name.common;
      borderCountriesContainer.appendChild(borderButton);
      borderCountriesContainerHTML = borderCountriesContainer.outerHTML;
    });
  } else {
    borderCountriesContainerHTML = "No border countries found";
  }

  populate(selectedCountry, borderCountriesContainerHTML);
});

function populate(country, borderCountriesContainerHTML) {
  const { population, region, subregion, capital, tld, currencies, languages } =
    country;

  const nativeName = Object.values(country.name.nativeName)[0].official;

  function stringify(array) {
    if (!array) return "None";
    return Object.values(array)
      .map((el) => el.name)
      .join(", ");
  }

  container.innerHTML = ` <img src="${country.flags.svg}" alt="country flag" />
      <section class="details">
        <h2>${country.name.common}</h2>
        <div class="details-container">
          <div>
            <p><strong>Native Name: </strong>${nativeName || "None"}</p>
            <p><strong>Population: </strong>${population.toLocaleString()}</p>
            <p><strong>Region: </strong>${region || "None"}</p>
            <p><strong>Sub Region: </strong>${subregion || "None"}</p>
            <p><strong>Capital: </strong>${capital || "None"}</p>
          </div>
          <div>
            <p><strong>Top Level Domain: </strong>${tld || "None"}</p>
            <p><strong>Currencies: </strong>${stringify(currencies)}</p>
            <p><strong>Languages: </strong>${Object.values(languages)}</p>
          </div>
          <div class="border">
            <h3>Border Countries:</h3>
            ${borderCountriesContainerHTML}
          </div>
        </div>
      </section>`;
}
