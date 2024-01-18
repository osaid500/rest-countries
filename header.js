const isRoot = window.location.pathname.endsWith("index.html");
const sunUrl = isRoot ? "./icons/sun.svg" : "../icons/sun.svg";
const moonUrl = isRoot ? "./icons/moon.svg" : "../icons/moon.svg";

function saveToStorage(theme) {
  localStorage.setItem("theme", theme);
}

document.addEventListener("DOMContentLoaded", () => {
  const img = document.createElement("img");
  img.classList.add("theme-icon");
  img.src = document.body.classList.contains("light-theme") ? moonUrl : sunUrl;
  img.alt = "change theme";
  img.role = "button";
  img.tabIndex = "0";

  const inner = `<h1 class="header-title">Where in the world?</h1>
      <div class="theme-selector">
        ${img.outerHTML}
        <p>Dark mode</p>
      </div>`;

  document.body.querySelector("header").innerHTML = inner;
  const selectedImage = document.querySelector(".theme-icon");

  selectedImage.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    selectedImage.src = document.body.classList.contains("light-theme")
      ? moonUrl
      : sunUrl;
  });
});
