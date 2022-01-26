function displayPhotographerData(photographers) { 
    const photographHeader = document.querySelector(".photograph-header"); // ajoute un node userCardDOM // ajout du s à photograoher(s)

    photographers.forEach((photographer) => { // 
        const photographerModel = photographerFactoryPage(photographer); // /factories/photographer.js
        const userCardDOM = photographerModel.getPhotographerCardDOMPage(); // /factories/photographer.js
        photographHeader.appendChild(userCardDOM); // ajoute un node userCardDOM
    });
};

async function initPhotographerData() {
    // Récupère les datas des photographes
    fetch("./data/photographers.json")
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // OK json objects
            const { photographers } = data; 
            displayPhotographerData(photographers);

            const photographerURL = window.location.search.split("?id=").join(""); 
            console.log(photographerURL) // OK 243(pex)

            const displayPhotographer = photographers.find(element => element.id == photographerURL); // en cours 
            console.log(displayPhotographer) // Ok j'obtiens l'objet du photographe cliqué

        });
};
initPhotographerData();