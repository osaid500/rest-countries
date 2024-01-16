const isRoot = window.location.pathname.endsWith("index.html");
const url = isRoot ? "./icons/sun.svg" : "../icons/sun.svg";
const inner = `<h1 class="header-title">Where in the world?</h1>
      <div class="theme-selector">
        <img
          src=${url}
          alt="change theme"
          role="button"
          tabindex="0"
        />
        <p>Dark mode</p>
      </div>`;

document.addEventListener("DOMContentLoaded", () => {
  document.body.querySelector("header").innerHTML = inner;
});