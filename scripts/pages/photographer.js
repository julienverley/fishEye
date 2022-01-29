/* 
Main / Photographer card header  
*/

const displayPhotographer = (photographer) => { // photographer en ref à dataPage // --> displayPhotographer reçoit ce qu'initPhotographerData renvoie comme paramètre
    const photographerHeader = document.querySelector(".photograph-header"); // ajoute un node userCardDOM 
    const photographerModel = photographerFactoryPage(photographer); // photographerModel = objet photographer avec keys/values
    const userCardDOM = photographerModel.createPhotographerCardDOMPage(); // userCardDOM = objet photographer créé dans le DOM
    photographerHeader.appendChild(userCardDOM); // ajoute un node userCardDOM 
};

const initPhotographerData = () => { // --> initPhotographerData returns un seul objet, avec les infos de photographerToDisplay
    /* 
    Récupère les datas des photographes
    */
    fetch("./data/photographers.json") //récupère le fichier json
        .then((response) => response.json()) // reçoit l'objet en brut et le transforme en json objet exploitable par js 
        .then((data) => { // les données prêtes à être exploitées, je les utilise  
            const photographers = data.photographers; // = data (photographers) du json ; data.photographers, je les nomme photographers (ou const { photographers } = data)
            const photographerUrlId = window.location.search.split("?id=").join(""); // récupération de l'ID dans l'URL 
            const photographerToDisplay = photographers.find(element => element.id == photographerUrlId); // display le photographer dont l'ID == l'ID de l'URL cliquée
            displayPhotographer(photographerToDisplay) // displayPhotographer affiche photographerToDisplay
        });
};

(initPhotographerData()); // ? pourquoi console.log: undedined ?



/* 
Main / Photographer pictures 
*/

// forEach
const displayMedias = (medias) => { // medias en ref à dataPage // --> displayMedia reçoit ce qu initMediaData renvoie comme paramètre
    const mediasCards = document.querySelector(".photograph-media-cards"); // ajoute un node userCardDOM 
    const mediasModel = mediasFactoryPage(medias); // photographerModel = objet photographer avec keys/values
    console.table(mediasModel)

    const mediasCardDOM = mediasModel.createMediasCardDOMPage(); // userCardDOM = objet photographer créé dans le DOM
    mediasCards.appendChild(mediasCardDOM); // ajoute un node userCardDOM 
};

const initMediaData = () => { // --> initPhotographerData returns un seul objet, avec les infos de photographerToDisplay
    /* 
    Récupère les datas des photographes
    */
    fetch("./data/photographers.json") //récupère le fichier json
        .then((response) => response.json()) // reçoit l'objet en brut et le transforme en json objet exploitable par js 
        .then((data) => { // les données prêtes à être exploitées, je les utilise  
            const media = data.media; // = data (photographers) du json ; data.photographers, je les nomme photographers (ou const { photographers } = data)
            console.log(data.media); // json objects, OK

            const photographerUrlId = window.location.search.split("?id=").join(""); // récupération de l'ID dans l'URL 
            console.log(photographerUrlId);  // OK 243(pex)



            const mediasToDisplay = media.find(element => element.photographerId == photographerUrlId); // display les medias dont l'ID == l'ID de l'URL cliquée
            console.table(mediasToDisplay); // J'obtiens un seul objet du media du photographe cliqué !! Faire un forEach ??  
            displayMedias(mediasToDisplay);  // displayPhotographer affiche photographerToDisplay



        });
};

(initMediaData()); // ? pourquoi console.log: undedined ?