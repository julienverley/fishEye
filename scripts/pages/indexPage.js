// Index page

// Get photographers datas from .json
function init() {
  fetch("data/photographers.json") // Get .json
    .then((response) => response.json()) // Make JS object
    .then((data) => {
      const { photographers } = data;
      displayData(photographers); // Launch the display
    });
}
init();

// Add userCardDOM nodes
function displayData(photographers) {
  const photographersSection = document.querySelector(".photographers-section");

  // For each photographer
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer); // Get data and build DOM
    const userCardDOM = photographerModel.getPhotographerCardDOM(); // Build DOM
    photographersSection.appendChild(userCardDOM); // Create node userCardDOM

    // On click event, URL
    userCardDOM.addEventListener("click", () => {
      window.location.href = `photographer.html?id=${photographer.id}`;
    });
  });
}
