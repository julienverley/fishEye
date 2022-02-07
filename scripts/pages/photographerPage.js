let currentLightBoxIndex = 0;

/** 
* Photographer card header  
*/
const displayPhotographer = (photographer) => { // displayPhotographer reçoit ce qu'initPhotographerData renvoie comme paramètre
    const photographerHeader = document.querySelector(".photograph-header"); // ajoute un node userCardDOM 
    const photographerModel = photographerFactoryPage(photographer); // photographerModel = objet photographer avec keys/values
    const userCardDOM = photographerModel.createPhotographerCardDOMPage(); // userCardDOM = objet photographer créé dans le DOM
    photographerHeader.appendChild(userCardDOM); // ajoute un node userCardDOM 
};


/* 
* Photographer medias 
*/
const displayMedias = (medias) => { // medias en ref à dataPage // --> displayMedia reçoit ce qu initMediaData renvoie comme paramètre
    const mediasCards = document.querySelector(".photograph-media-cards"); // ajoute un node userCardDOM 
    
    medias.forEach((media, index) => { // !! deuxième paramètre (media, index) pour naviguer 
        const mediasModel = mediasFactoryPage(media); // mediasModel = objet medias avec keys/values
        const mediasCardDOM = mediasModel.createMediasCardDOMPage(); // mediasCardDOM = objet media créé dans le DOM
        mediasCards.appendChild(mediasCardDOM); // ajoute un node userCardDOM 
       

       
        /**
         * Lightbox click on media to display 
         */
        mediasCardDOM.addEventListener('click', () => { // au click...
            const sourceMediaClicked = mediasCardDOM.querySelector('img').src;
            const lightBoxImgElement = document.querySelector('.lightbox__container img');
            lightBoxImgElement.src = sourceMediaClicked;
            console.log(index);
            currentLightBoxIndex = index;
            
            displayLightbox() // OK 
        });
    }); 
    /**
     * lightbox previous button 
     */
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
    /**
     * lightbox next button 
     */
    document.querySelector('.lightbox__next').addEventListener('click', () => {
        if (currentLightBoxIndex === medias.length - 1) {
            currentLightBoxIndex = medias.length - medias.length;
        } else {
            currentLightBoxIndex = currentLightBoxIndex + 1;
        }
        const newElement = medias[currentLightBoxIndex];
        const lightBoxImgElement = document.querySelector('.lightbox__container img');
        lightBoxImgElement.src = `assets/photographersMedias/${newElement.photographerId}/${newElement.image}`;
    });
    /**
     * Lighbox close button
     */
    document.querySelector('.lightbox__close').addEventListener('click'), () => { // ? Manque un argument ? 
        closeLightbox(); 
    }
    
};

/**
 * Init photographer et medias datas
 */

const initPhotographerPage = () => { // Return un objet, avec les infos de mediasToDisplay et photographerToDisplay
    /* 
    Récupère les datas photographer et medias 
    */
    fetch("./data/photographers.json") // récupère le .json
        .then((response) => response.json()) // transformation en .json exploitable par JS
        .then((data) => { // données à exploiter, on les utilise : 
            const searchParams = new URLSearchParams(window.location.search);
            const photographerId = searchParams.get('id');
            const mediasToDisplay = data.media.filter(element => element.photographerId == photographerId);
            const photographerToDisplay = data.photographers.find(element => element.id == photographerId);
            displayPhotographer(photographerToDisplay);
            displayMedias(mediasToDisplay);
        });
}

initPhotographerPage();