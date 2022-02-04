let currentLightBoxIndex = 0;

// ajouté, non lu 
/* import { Lightbox } from "./scripts/utils/lightbox.js";
 */

/* 
Main / Photographer card header  
*/
const displayPhotographer = (photographer) => { // displayPhotographer reçoit ce qu'initPhotographerData renvoie comme paramètre
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
            
            const photographerUrlId = getIdParameter(); // Renvoie à la fonction de urlId.js
            /* const searchParams = new URLSearchParams(window.location.search); // cf. urlId.js
            const photographerUrlId = searchParams.get('id'); // cf. urlId.js
            console.log(photographerUrlId); */ // cf. urlId.js // je m'entraine à appeler des fonctions dans d'autres .js 

            const photographerToDisplay = photographers.find(element => element.id == photographerUrlId); // display le photographer dont l'ID == l'ID de l'URL cliquée
            displayPhotographer(photographerToDisplay) // displayPhotographer (autre fonction) affiche photographerToDisplay
        });
};
(initPhotographerData()); // ? pourquoi console.log: undedined ?


/* 
Main / Photographer medias 
*/
const displayMedias = (medias) => { // medias en ref à dataPage // --> displayMedia reçoit ce qu initMediaData renvoie comme paramètre
    const mediasCards = document.querySelector(".photograph-media-cards"); // ajoute un node userCardDOM 
    
    // forEach    
    medias.forEach((media, index) => { // !! CF screenshot deuxième paramètre (media, index) pour naviguer !! 
        const mediasModel = mediasFactoryPage(media); // photographerModel = objet photographer avec keys/values
        // console.table(mediasModel)
        const mediasCardDOM = mediasModel.createMediasCardDOMPage(); // mediasCardDOM = objet photographer créé dans le DOM
        mediasCards.appendChild(mediasCardDOM); // ajoute un node userCardDOM 
   
        console.log(mediasCardDOM);
        mediasCardDOM.addEventListener('click', () => { // au click...
            const sourceMediaClicked = mediasCardDOM.querySelector('img').src;
            const lightBoxImgElement = document.querySelector('.lightbox__container img');
            lightBoxImgElement.src = sourceMediaClicked;
            console.log(index);
            currentLightBoxIndex = index;
        });
    }); 

    document.querySelector('.lightbox__prev').addEventListener('click', () => {
        if (currentLightBoxIndex === 0) {
            currentLightBoxIndex = medias.length - 1;
        } else {
            currentLightBoxIndex = currentLightBoxIndex - 1;
        }
        const newElement = medias[currentLightBoxIndex];
        const lightBoxImgElement = document.querySelector('.lightbox__container img');
        lightBoxImgElement.src = `assets/photographersMedias/${newElement.photographerId}/${newElement.image}`;
    });
};

const initMediaData = () => { // --> initPhotographerData returns un seul objet, avec les infos de photographerToDisplay
    /* 
    Récupère les datas des photographes
    */
    fetch("./data/photographers.json") //récupère le fichier json
        .then((response) => response.json()) // reçoit l'objet en brut et le transforme en json objet exploitable par js 
        .then((data) => { // les données prêtes à être exploitées, je les utilise  
            const media = data.media; // = data (media) du json ; data.media, je les nomme media (ou const { media } = data)
            // console.log(data.media); // json media objects: OK
            const searchParams = new URLSearchParams(window.location.search); 
            const photographerUrlId = searchParams.get('id');       
            // console.log(photographerUrlId);      
            const mediasToDisplay = media.filter(element => element.photographerId == photographerUrlId); // display les medias dont l'ID == l'ID de l'URL cliquée
            console.table(mediasToDisplay); // OK (filter plusieurs éléments ≠ find un seul élément)
            displayMedias(mediasToDisplay);  // displayMedias (l'autre fonction) affiche mediasToDisplay
        });
       
};
(initMediaData()); // ? pourquoi console.log: undedined ?


// Refactorisation
/* const initPhotographerPage = () => {
    fetch("./data/photographers.json")
        .then((response) => response.json())
        .then((data) => {
            const searchParams = new URLSearchParams(window.location.search);
            const photographerId = searchParams.get('id');
            const mediasToDisplay = data.media.filter(element => element.photographerId == photographerId);
            const photographerToDisplay = data.photographers.find(element => element.id == photographerId);
            displayPhotographer(photographerToDisplay);
            displayMedias(mediasToDisplay);
        });
}

initPhotographerPage(); */