/**
 * Variables 
 */
const imgRegex = /^.*\.(jpg)$/
const videoRegex = /^.*\.(mp4)$/
const footer = document.querySelector(".footer"); 
let currentLightboxIndex = 0;
let mediasLikesTotal = 0; 

/**
 * Init photographer et medias datas
 */
 const initPhotographerPage = () => { // Return un objet, avec les infos de mediasToDisplay et photographerToDisplay
    /* 
    Get photographer and medias datas
    */
    fetch("./data/photographers.json") // récupère le .json
        .then((response) => response.json()) // transformation en .json exploitable par JS
        .then((data) => { // données à exploiter, on les utilise : 
            console.log("FETCH")
            const searchParams = new URLSearchParams(window.location.search);
            const photographerId = searchParams.get('id');
            const photographerToDisplay = data.photographers.find(element => element.id == photographerId); 
            const mediasToDisplay = data.media.filter(element => element.photographerId == photographerId);
            const priceToDisplay = photographerToDisplay.price
            displayPhotographer(photographerToDisplay);
            displayMedias(mediasToDisplay);
            displayPrice(priceToDisplay); 
            document.getElementById('photographerNameContact').textContent = photographerToDisplay.name
        });
}
initPhotographerPage();

/** Header **
* Header Photographer card display
*/
const displayPhotographer = (photographer) => { // displayPhotographer reçoit ce qu'initPhotographerData renvoie comme paramètre
    const photographerHeader = document.querySelector(".photograph-header"); // ajoute un node userCardDOM 
    const photographerModel = photographerFactoryPage(photographer); // photographerModel = objet photographer avec keys/values
    const userCardDOM = photographerModel.createPhotographerCardDOMPage(); // userCardDOM = objet photographer créé dans le DOM
    photographerHeader.appendChild(userCardDOM); // ajoute un node userCardDOM 
};

/** Footer **
* Price display
*/
const displayPrice = (price) => { 
    const divPrice = document.createElement('div'); 
    divPrice.classList.add('price')
    const priceCardDOM =`<h2>${price}€ / jour</h2>`;   
    divPrice.innerHTML = priceCardDOM; 
    footer.append(divPrice); 
}


/** Medias gallery **
* Likes, lightbox, sort
*/
const displayMedias = (medias) => { // displayMedia reçoit ce qu'initPhotographerPage renvoie comme paramètre
    const mediasCards = document.querySelector(".photograph-media-cards"); // ajoute un node mediasCards 

    /** MediasCardsFigure gallery
     * Likes and lightbox display
     */
    const displayMediaDom = (medias) => { // refactorisé 
        /** medias forEach
         * Display 
         */
        medias.forEach((media) => { 
            if (media.hasOwnProperty("image")) { // return boolean true of false, if media = image...
                mediasCards.append(createImageFactoryPage(media)) // ...create DOM image element
            } else if (media.hasOwnProperty("video")){ // else if media = video...
                mediasCards.append(createVideoFactoryPage(media)) // ...create DOM video element
            }
        }); 
    
        /** mediasCardsFigure
         * Loop, for... of 
         */
        const mediasCardsFigure = document.querySelectorAll(".photograph-media-cards > figure")
        
        for (const [index, figure] of mediasCardsFigure.entries()) { // [index = key, figure = value]
            const mediasLikes = figure.getElementsByTagName('h2')[1].textContent; 
            let mediasLikesNumber = parseInt(mediasLikes, 10); // typeof = 10 numbers
            mediasLikesTotal += mediasLikesNumber; // 10 résultats incrémentés

                /** MediasCardsFigure
                * Likes (popularity)
                */ 
                figure.querySelector('.heart').addEventListener('click', (e) => {
                    figure.classList.toggle("is_liked"); // toute la card
                        if (figure.classList.contains("is_liked")) {
                            mediasLikesNumber += 1 // problème : +0 puis +1 
                            figure.getElementsByTagName('h2')[1].textContent = mediasLikesNumber
                            mediasLikesTotal++
                            removeTotalLikes()
                            updateTotalLikes()
                        } else { 
                            mediasLikesNumber -= 1
                            figure.getElementsByTagName('h2')[1].textContent = mediasLikesNumber
                            mediasLikesTotal--
                            removeTotalLikes()
                            updateTotalLikes()
                        }
                })

                /** Lightbox
                * Click on mediasCardsFigure to display 
                */ 
                figure.firstChild.addEventListener('click', () => {    
                    console.log(index)
                    const sourceMediaClicked = figure.firstChild.src; 
                    const titleMediaClicked = figure.getElementsByTagName('h2')[0].textContent 
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
         * Display total of likes into the DOM
         */
        const displayTotalLikes = () => {     
            const divLikes = document.createElement('div'); 
            divLikes.classList.add('total_likes')
            const mediasLikesTotalCardDOM = `<h2 id="likes">${mediasLikesTotal}</h2>
                                            <div class="heart filter_icons"><i class="fa fa-heart fa-lg" title="heart icon"></i></div>`;
            divLikes.innerHTML = mediasLikesTotalCardDOM; 
            footer.prepend(divLikes); 
        }
        displayTotalLikes(); // En dehors de la boucle, pour afficher le dernier résultat 

        /**
         * Total likes upadate
         */
        const removeTotalLikes = () => { // cf. react useStat // 
            document.getElementById('likes').textContent = ""
        }
        const updateTotalLikes = () => {
            document.getElementById('likes').textContent = mediasLikesTotal
        }


        /** Lightbox
         * Close, left and right with keys 
         */
        const lightboxPrevious = () => {
            console.log(currentLightboxIndex)
            if (currentLightboxIndex === 0) { // lorsque index[0] (et que click previous)... 
                currentLightboxIndex = medias.length - 1; // ... index[last] 
            } else {
                currentLightboxIndex = currentLightboxIndex - 1; // ou currentLightboxIndex -- ////////////////////////
            }

            //////////////////////// Refactoriser //////////////////////// 

            const newElement = mediasCardsFigure[currentLightboxIndex]; // = div index[] //////////////// A revoir // 
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
                lightboxContainer.append(h2) // +
        
            } else if(newElementSrc.match(videoRegex)){
                const video = document.createElement('video') // video ...
                video.src = newElementSrc
                video.controls = true;
                lightboxContainer.append(video) 
                const h2 = document.createElement('h2') // video title ..
                h2.innerHTML = newElementTitle // + 
                lightboxContainer.append(h2) // +
            }
        };

        const lightBoxNext = () => {
            console.log(currentLightboxIndex)
            if (currentLightboxIndex === medias.length - 1) { // lorsque index[0] (et que click previous)... 
                currentLightboxIndex = medias.length - medias.length; // ... index[last] 
            } else {
                currentLightboxIndex = currentLightboxIndex + 1;  // ou currentLightboxIndex ++
            }

            //////////////////////// Refactoriser //////////////////////// 

            const newElement = mediasCardsFigure[currentLightboxIndex]; 
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
                lightboxContainer.append(h2) // +

            } else if(newElementSrc.match(videoRegex)){
                const video = document.createElement('video') // video 
                video.src = newElementSrc
                video.controls = true;
                lightboxContainer.append(video) 
                const h2 = document.createElement('h2') // video title ..
                h2.innerHTML = newElementTitle // + 
                lightboxContainer.append(h2) // +
            }
        }
    
        /** Lightbox
         * Close, left and right with keys 
         */
        document.addEventListener('keyup', (event) => {      
            event.preventDefault()      
            if (event.code === "Escape") {
                closeLightbox(); 
            }
        }); 
        document.addEventListener('keyup', (event) => {
            event.preventDefault()      
            if (event.code === "ArrowLeft") {
                lightboxPrevious();
                console.log("Bougé avec le clavier gauche")
            }
        }); 
        document.addEventListener('keyup', (event) => {
            event.preventDefault()      
            if (event.code === "ArrowRight") {
                lightBoxNext();
                console.log("Bougé avec le clavier droite")
            }
        }); 

        /**
         * lightbox, previous, next, close buttons 
         */
        document.querySelector('.lightbox__prev').addEventListener('click', (event) => {
            event.stopImmediatePropagation()
            event.preventDefault()
            lightboxPrevious();
            console.log("Bougé au click gauche")
        }); 
        document.querySelector('.lightbox__next').addEventListener('click', (event) => {
            event.stopImmediatePropagation()
            event.preventDefault()
            lightBoxNext();
            console.log("Bougé au click droit")
        });
        document.querySelector('.lightbox__close').addEventListener('click', (event) => { 
            event.stopImmediatePropagation()
            event.preventDefault()
            closeLightbox(); 
        }); 
    }

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    /** Medias gallery
    * Sort by name or popularity
    */
     displayMediaDom(medias);  // Antoine
    const dropdownContainer = document.getElementById('dropdownContainer')
    medias.sort(function(a, b){
        if(a.likes > b.likes) { return -1; }
        if(a.likes < b.likes) { return 1; }
        return 0;
    });
    //mediasCards.innerHTML = '';
    removeAllChildNodes(mediasCards)

    mediasLikesTotal = 0
    document.querySelector(".total_likes").remove()
    displayMediaDom(medias); // lightbox index modifié

        dropdownContainer.addEventListener('click', (e) => {
            if (e.target.id == "listbox-title") {
                medias.sort(function(a, b){
                    if(a.title < b.title) { return -1; }
                    if(a.title > b.title) { return 1; }
                    return 0;
                });
                //mediasCards.innerHTML = '';
                removeAllChildNodes(mediasCards)
                mediasLikesTotal = 0
                displayMediaDom(medias); // lightbox index modifié
                document.querySelector(".total_likes").remove()
            } else if (e.target.id == "listbox-popularity") {
                medias.sort(function(a, b){
                    if(a.likes > b.likes) { return -1; }
                    if(a.likes < b.likes) { return 1; }
                    return 0;
                });
                //mediasCards.innerHTML = '';
                removeAllChildNodes(mediasCards)
                mediasLikesTotal = 0
                document.querySelector(".total_likes").remove()
                displayMediaDom(medias); // lightbox index modifié
            }
        })
};

