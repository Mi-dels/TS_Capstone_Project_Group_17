const API_URL = "https://anurella.github.io/json/planet.json";

// ----- Elements -----
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("planetSearch");
const searchStatus = document.getElementById("searchStatus");
const errorMessage = document.getElementById("errorMessage");
const planetCard = document.getElementById("planetCard");

// ----- Light / Dark mode -----
//
// ----- Show a planet in the card -----
function setField(field, value) {
  document
    .querySelectorAll(`[data-field="${field}"]`)
    .forEach((el) => (el.textContent = value));
}

function displayPlanet(planet) {
  const img = document.getElementById("planetImage");
  img.src = planet.image;
  img.alt = planet.name;

  document.getElementById("planetName").textContent = planet.name;
  document.getElementById("planetType").textContent = planet.type;
  document.getElementById("planetDescription").textContent = planet.description;
  document.getElementById("planetGravity").textContent = planet.gravity;
  document.getElementById("planetMass").textContent = planet.mass;
  document.getElementById("planetPeriod").textContent = planet.period;

  setField("temperature", planet.temperature);
  setField("moons", planet.moons);
  setField("diameter", planet.diameter);
  setField("distance", planet.distanceFromSun);
}

// ----- Error state -----
function showError() {
  planetCard.hidden = true;
  errorMessage.hidden = false;
  searchStatus.textContent = "No results";
}

// ----- Search -----
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const searchValue = searchInput.value.trim().toLowerCase();
  if (!searchValue) return;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Request failed");

    const planets = await response.json();
    const planet = planets.find(
      (item) => item.name.toLowerCase() === searchValue,
    );
    
    if (planet) {
      errorMessage.hidden = true;
      planetCard.hidden = false;
      searchStatus.textContent = "";
      displayPlanet(planet);
    } else {
      showError();
    }
  } catch (error) {
    showError();
  }
});
const THEME_FILES = {
  dark: "css/style.css",
  light: "css/lightmode.css", // <- change to your light CSS file name
};

const themeLink = document.getElementById("themeStylesheet");
const lightBtn = document.querySelector('[aria-label="Toggle light mode"]');
const darkBtn = document.querySelector('[aria-label="Toggle dark mode"]');

function setTheme(mode) {
  themeLink.href = THEME_FILES[mode];
  localStorage.setItem("theme", mode);
}

lightBtn.addEventListener("click", () => setTheme("light"));
darkBtn.addEventListener("click", () => setTheme("dark"));

// Remember the last choice (dark by default)
setTheme(localStorage.getItem("theme") || "dark");