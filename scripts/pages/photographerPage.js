/**
 * Variables 
 */
 let currentLightboxIndex = 0;
 const imgRegex = /^.*\.(jpg)$/
 const videoRegex = /^.*\.(mp4)$/
 
 let mediasLikesTotal = 0; 

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
            const photographerToDisplay = data.photographers.find(element => element.id == photographerId); // element ?
            const mediasToDisplay = data.media.filter(element => element.photographerId == photographerId);

            const priceToDisplay = photographerToDisplay.price
        
            displayPhotographer(photographerToDisplay); // 
            displayMedias(mediasToDisplay);
            displayPrice(priceToDisplay)
        });
}
initPhotographerPage();

/** Header
* Header Photographer card display
*/
const displayPhotographer = (photographer) => { // displayPhotographer reçoit ce qu'initPhotographerData renvoie comme paramètre
    const photographerHeader = document.querySelector(".photograph-header"); // ajoute un node userCardDOM 
    const photographerModel = photographerFactoryPage(photographer); // photographerModel = objet photographer avec keys/values
    const userCardDOM = photographerModel.createPhotographerCardDOMPage(); // userCardDOM = objet photographer créé dans le DOM
    photographerHeader.appendChild(userCardDOM); // ajoute un node userCardDOM 
};

/** Footer
* Footer price display
*/
const displayPrice = (price) => { 
    const footer = document.querySelector(".footer"); 
    const divPrice = document.createElement('div'); 
    divPrice.classList.add('price')
    const priceCardDOM =`<h2>${price}€ / jour</h2>`;   
    divPrice.innerHTML = priceCardDOM; 
    footer.append(divPrice); 
}

/** Medias **
* Medias Photographer display
*/
const displayMedias = (medias) => { // displayMedia reçoit ce qu'initPhotographerPage renvoie comme paramètre
    const mediasCards = document.querySelector(".photograph-media-cards"); // ajoute un node mediasCards 

    /** Gallery **
    * Gallery, create card-image or card-video (DOM)
    */
    medias.forEach((media) => { 
        if (media.hasOwnProperty("image")) { // return boolean true of false, if media = image...
            mediasCards.append(createImageFactoryPage(media)) // ...create DOM image element
        } else if (media.hasOwnProperty("video")){ // else if media = video...
            mediasCards.append(createVideoFactoryPage(media)) // ...create DOM video element
        }
    }); 

     
    const mediasCardsChildren = document.querySelectorAll(".photograph-media-cards > figure")
    for (const [index, figure] of mediasCardsChildren.entries()) { // [index = key, figure = value]

    //////////////////////////////////////////////////////////////////////////////
    
    const mediasLikes = figure.getElementsByTagName('h2')[1].textContent; 
    // console.log(+mediasLikes); // typeof = 10 strings, puis 10 numbers with + 
    let mediasLikesNumber = parseInt(mediasLikes, 10); 
    mediasLikesTotal += mediasLikesNumber; // typeof = 10 numbers
    // const getTotalLikes = 
    
        figure.querySelector('.heart').addEventListener('click', (e) => {
            /* if (figure a la classe "isliked") {
                mediasLikesTotal--
                enleve class isliked
            }
            mediasLikesTotal++
            donner class sliked */

        })

    //////////////////////////////////////////////////////////////////////////////

        /** Lightbox **
        * Lightbox, click on media to display 
        */ 
        figure.firstChild.addEventListener('click', () => {    
            const sourceMediaClicked = figure.firstChild.src; // OK
            const titleMediaClicked = figure.getElementsByTagName('h2')[0].textContent // OK
            console.log(titleMediaClicked);
           
            if(sourceMediaClicked.match(imgRegex)){
                const img = document.createElement('img')
                const title = document.createElement('h2')
                const lightboxContainer = document.querySelector('.lightbox__container')
                img.src = sourceMediaClicked
                title.textContent = titleMediaClicked
                lightboxContainer.appendChild(img)
                lightboxContainer.appendChild(title)
                currentLightboxIndex = index;
                displayLightbox()

            } else if(sourceMediaClicked.match(videoRegex)){
                const video = document.createElement('video')
                const title = document.createElement('h2')
                video.src = sourceMediaClicked
                title.textContent = titleMediaClicked

                video.controls = true;
                const lightboxContainer = document.querySelector('.lightbox__container')
                lightboxContainer.append(video) 
                lightboxContainer.append(title)
                currentLightboxIndex = index;
                displayLightbox()
            }
        })
    }

    
     /** 
     * Lightbox, close on Escape key 
     */
    document.addEventListener('keyup', (event) => {
        event.preventDefault()
        console.log(event.code); 
        if (event.code === "Escape") {
            closeLightbox(); 
        }
    }); 
/*     
    document.addEventListener('keyup', (event) => {
        console.log(event.code); 
        if (event.code === "ArrowLeft") {
            // Créer une fonction lightboxPrev(); 
        }
    }); 
    
    document.addEventListener('keyup', (event) => {
        console.log(event.code); 
        if (event.code === "ArrowRight") {
            // Créer une fonction lightboxNext(); 
        }
    }); 
 */

    /**
     * lightbox, previous button 
     */

    document.querySelector('.lightbox__prev').addEventListener('click', () => {
        
        if (currentLightboxIndex === 0) { // lorsque index[0] (et que click previous)... 
            currentLightboxIndex = medias.length - 1; // ... index[last] 
        } else {
            currentLightboxIndex = currentLightboxIndex - 1; // ou currentLightboxIndex --
        }
    
        const newElement = mediasCardsChildren[currentLightboxIndex]; // = div index[] //////////////// A revoir // 
        const newElementSrc = newElement.firstChild.src // = src URL of newElement index [] 
        const newElementTitle = newElement.getElementsByTagName('h2')[0].textContent // +
        const lightboxContainer = document.querySelector('.lightbox__container')
        lightboxContainer.innerHTML = "" // empty existing contains
    
        if(newElementSrc.match(imgRegex)){
            const img = document.createElement('img') // image ..
            img.src = newElementSrc
            lightboxContainer.append(img)
            const h2 = document.createElement('h2') // image title ..
            h2.innerHTML = newElementTitle // + 
            console.log(h2) // +
            lightboxContainer.append(h2) // +
    
        } else if(newElementSrc.match(videoRegex)){
            const video = document.createElement('video') // video ...
            video.src = newElementSrc
            video.controls = true;
            lightboxContainer.append(video) 
            const h2 = document.createElement('h2') // video title ..
            h2.innerHTML = newElementTitle // + 
            console.log(h2) // +
            lightboxContainer.append(h2) // +
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
        const newElementTitle = newElement.getElementsByTagName('h2')[0].textContent // +
        const lightboxContainer = document.querySelector('.lightbox__container')
        lightboxContainer.innerHTML = ""

        if(newElementSrc.match(imgRegex)){
            const img = document.createElement('img') // image 
            img.src = newElementSrc
            lightboxContainer.append(img)
            const h2 = document.createElement('h2') // image title ..
            h2.innerHTML = newElementTitle // + 
            console.log(h2) // +
            lightboxContainer.append(h2) // +

        } else if(newElementSrc.match(videoRegex)){
            const video = document.createElement('video') // video 
            video.src = newElementSrc
            video.controls = true;
            lightboxContainer.append(video) 
            const h2 = document.createElement('h2') // video title ..
            h2.innerHTML = newElementTitle // + 
            console.log(h2) // +
            lightboxContainer.append(h2) // +
        }
    });
    
    /**
     * Lighbox, close button
     */
    document.querySelector('.lightbox__close').addEventListener('click', () => { 
        closeLightbox(); 
    }); 
};









// Likes cf. Fromscratch 1/6 (last 10')

// Filtres popularité, likes, date
// méthode sort, avec a et b, array.sort((a, b) => a - b)); cf. Fromscratch 3/6 1'53, object 2'09 ! 
// Sort, dates, Fromscratch 3/6 2'49
// Date destructuring 3'06
