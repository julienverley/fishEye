// ESSAIS 


async function displayPhotographerData(photographers) { // async function displayData(photographers) { ? 
    const photographHeader = document.querySelector(".photograph-header"); // ajoute un node userCardDOM // ajout du s à photograoher(s)

    photographers.forEach((photographer) => { // photographer.s (any)
        const photographerModel = photographerFactoryPage(photographer); // /factories/photographer.js
        const userCardDOM = photographerModel.getPhotographerCardDOM(); // /factories/photographer.js
        photographHeader.appendChild(userCardDOM); // ajoute un node userCardDOM
    });
};

async function init() { // async function init() { ? 
    // Récupère les datas des photographes

    fetch("./data/photographers.json")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const { photographers } = data; 
            displayPhotographerData(photographers);
        });
};

init();