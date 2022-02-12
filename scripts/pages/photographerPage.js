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
            const photographerToDisplay = data.photographers.find(element => element.id == photographerId);
            const mediasToDisplay = data.media.filter(element => element.photographerId == photographerId);
            displayPhotographer(photographerToDisplay);
            displayMedias(mediasToDisplay);
        });
}
initPhotographerPage();

/**
 * Variables 
 */

let currentLightboxIndex = 0;
const imgRegex = /^.*\.(jpg)$/
const videoRegex = /^.*\.(mp4)$/

/** Header
/** 
* Header Photographer card display
*/
const displayPhotographer = (photographer) => { // displayPhotographer reçoit ce qu'initPhotographerData renvoie comme paramètre
    const photographerHeader = document.querySelector(".photograph-header"); // ajoute un node userCardDOM 
    const photographerModel = photographerFactoryPage(photographer); // photographerModel = objet photographer avec keys/values
    const userCardDOM = photographerModel.createPhotographerCardDOMPage(); // userCardDOM = objet photographer créé dans le DOM
    photographerHeader.appendChild(userCardDOM); // ajoute un node userCardDOM 
};

/** Medias **
/**
* Medias Photographer display
*/
const displayMedias = (medias) => { // displayMedia reçoit ce qu'initPhotographerPage renvoie comme paramètre
    const mediasCards = document.querySelector(".photograph-media-cards"); // ajoute un node mediasCards 
   
    /** Gallery **
    /** 
    * Gallery, create card-image or card-video (DOM)
    */
    medias.forEach((media) => { 
        if (media.hasOwnProperty("image")) { // return boolean true of false, if media = image...
            mediasCards.append(createImageFactoryPage(media)) // ...create DOM image element
        } else if (media.hasOwnProperty("video")){ // else if media = video...
            mediasCards.append(createVideoFactoryPage(media)) // ...create DOM video element
        }
    }); 

     /** Lightbox **
     /** 
     * Lightbox, click on media to display 
     */
    const mediasCardsChildren = document.querySelectorAll(".photograph-media-cards > div")
    for (const [index, div] of mediasCardsChildren.entries()) { // [index = key, div = value]
        
        div.addEventListener('click', () => {          
            const sourceMediaClicked = div.firstChild.src; 
            const titleMediaClicked = div.firstChild.nextSibling.textContent // OK
            console.log(div);
            console.log(titleMediaClicked);
           
            if(sourceMediaClicked.match(imgRegex)){
                const img = document.createElement('img')
                const lightboxContainer = document.querySelector('.lightbox__container')
                img.src = sourceMediaClicked
                lightboxContainer.append(img)

                
                document.getElementsByClassName("lightbox-media-title").innerHTML = "<h1>${titleMediaClicked}<h1/>" // But, afficher modal media title /////////////////
                console.log(titleMediaClicked) // OK "title" affiché, mais il n'apparait pas dans la lightbox 
                
                currentLightboxIndex = index;
                displayLightbox()
            } else if(sourceMediaClicked.match(videoRegex)){
                const video = document.createElement('video')
                video.src = sourceMediaClicked
                video.controls = true;
                const lightboxContainer = document.querySelector('.lightbox__container')
                lightboxContainer.append(video) 
                currentLightboxIndex = index;
                displayLightbox()
            }
        })
    }

    /**
     * lightbox, previous button 
     */
    document.querySelector('.lightbox__prev').addEventListener('click', () => {
        if (currentLightboxIndex === 0) { // lorsque index[0] (et que click previous)... 
            currentLightboxIndex = medias.length - 1; // ... index[last] 
        } else {
            currentLightboxIndex = currentLightboxIndex - 1; // ou currentLightboxIndex --
        }

        const newElement = mediasCardsChildren[currentLightboxIndex]; // = div index[] // A revoir // 
        const newElementSrc = newElement.firstChild.src // = src URL of newElement index [] media

        const lightboxContainer = document.querySelector('.lightbox__container')
        lightboxContainer.innerHTML = "" // empty existing contains

        if(newElementSrc.match(imgRegex)){
            const img = document.createElement('img')
            img.src = newElementSrc
            lightboxContainer.append(img)
        } else if(newElementSrc.match(videoRegex)){
            const video = document.createElement('video')
            video.src = newElementSrc
            video.controls = true;
            lightboxContainer.append(video) 
        }
    });

    /**
     * lightbox, next button 
     */     
    document.querySelector('.lightbox__next').addEventListener('click', () => {
        if (currentLightboxIndex === medias.length - 1) { // lorsque index[0] (et que click previous)... 
            currentLightboxIndex = medias.length - medias.length; // ... index[last] 
        } else {
            currentLightboxIndex = currentLightboxIndex + 1; // ou currentLightboxIndex ++
        }

        const newElement = mediasCardsChildren[currentLightboxIndex]; 
        const newElementSrc = newElement.firstChild.src

        const lightboxContainer = document.querySelector('.lightbox__container')
        lightboxContainer.innerHTML = ""

        if(newElementSrc.match(imgRegex)){
            const img = document.createElement('img')
            img.src = newElementSrc
            lightboxContainer.append(img)
        } else if(newElementSrc.match(videoRegex)){
            const video = document.createElement('video')
            video.src = newElementSrc
            video.controls = true;
            lightboxContainer.append(video) 
        }
    });
    
    /**
     * Lighbox, close button
     */
    document.querySelector('.lightbox__close').addEventListener('click', () => { // ? Manque un argument ? 
        closeLightbox(); 
    }); 
    
};

// Filtres popularité, likes, date
// méthode sort, avec a et b, array.sort((a, b) => a - b)); cf. Fromscratch 3/6 1'53, object 2'09 ! 
// Sort, dates, Fromscratch 3/6 2'49
// Date destructuring 3'06