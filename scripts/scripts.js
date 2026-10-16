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
