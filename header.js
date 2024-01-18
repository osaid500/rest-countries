const isRoot = window.location.pathname.endsWith("index.html");
const sunUrl = isRoot ? "./icons/sun.svg" : "../icons/sun.svg";
const moonUrl = isRoot ? "./icons/moon.svg" : "../icons/moon.svg";

function saveToStorage(theme) {
  localStorage.setItem("theme", theme);
}

function checkIfLight() {
  return localStorage.getItem("theme") === "light-theme";
}

document.addEventListener("DOMContentLoaded", () => {
  const img = document.createElement("img");
  img.classList.add("theme-icon");
  img.src = checkIfLight() ? moonUrl : sunUrl;
  checkIfLight()
    ? document.body.classList.add("light-theme")
    : document.body.classList.remove("light-theme");
  img.alt = "change theme";
  img.role = "button";
  img.tabIndex = "0";

  const inner = `<h1 class="header-title">Where in the world?</h1>
      <div class="theme-selector">
        ${img.outerHTML}
        <p>${checkIfLight() ? "Light mode" : "Dark mode"}</p>
      </div>`;

  document.body.querySelector("header").innerHTML = inner;
  const themeSelector = document.querySelector(".theme-selector");
  const selectedImage = themeSelector.querySelector(".theme-icon");

  selectedImage.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    const theme = isLight ? "light-theme" : "";
    themeSelector.querySelector("p").textContent = isLight
      ? "Light mode"
      : "Dark mode";
    selectedImage.src = document.body.classList.contains("light-theme")
      ? moonUrl
      : sunUrl;

    saveToStorage(theme);
  });
});
