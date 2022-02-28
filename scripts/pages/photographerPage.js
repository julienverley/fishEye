/* eslint-disable */
/**
 * Variables
 */
const imgRegex = /^.*\.(jpg)$/;
const videoRegex = /^.*\.(mp4)$/;
const footer = document.querySelector('.footer');
let currentLightboxIndex = 0;
let mediasLikesTotal = 0;

/**
  * Init photographer et medias datas
  */
const initPhotographerPage = () => {
  // Return un objet, avec les infos de mediasToDisplay et photographerToDisplay
  /*
     Get photographer and medias datas
     */
  fetch('../../data/photographers.json') // récupère le .json
    .then((response) => response.json()) // transformation en .json exploitable par JS
    .then((data) => {
      // données à exploiter, on les utilise :
      const searchParams = new URLSearchParams(window.location.search);
      const photographerId = searchParams.get('id');
      const photographerToDisplay = data.photographers.find(
        (element) => element.id == photographerId,
      );
      const mediasToDisplay = data.media.filter(
        (element) => element.photographerId == photographerId,
      );
      const priceToDisplay = photographerToDisplay.price;
      displayPhotographer(photographerToDisplay);
      displayMedias(mediasToDisplay);
      displayPrice(priceToDisplay);
      document.getElementById('photographerNameContact').textContent = photographerToDisplay.name;
    });
};
initPhotographerPage();

/** Header **
  * Header Photographer card display
  */
const displayPhotographer = (photographer) => {
  // displayPhotographer reçoit ce qu'initPhotographerData renvoie comme paramètre
  const photographerHeader = document.querySelector('.photograph-header'); // ajoute un node userCardDOM
  const photographerModel = photographerFactoryPage(photographer); // photographerModel = objet photographer avec keys/values
  const userCardDOM = photographerModel.createPhotographerCardDOMPage(); // userCardDOM = objet photographer créé dans le DOM
  photographerHeader.appendChild(userCardDOM); // ajoute un node userCardDOM
};

/** Footer **
  * Price display DOM
  */
const displayPrice = (price) => {
  const divPrice = document.createElement('div');
  divPrice.classList.add('price');
  const priceCardDOM = `<h2 tabindex="4">${price}€ / jour</h2>`;
  divPrice.innerHTML = priceCardDOM;
  footer.append(divPrice);
};

/** Medias gallery **
 * Likes, lightbox, sort
 */
const displayMedias = (medias) => {
  // displayMedia reçoit ce qu'initPhotographerPage renvoie comme paramètre
  const mediasCards = document.querySelector('.photograph-media-cards'); // ajoute un node mediasCards

  /** MediasCardsFigure gallery
   * Likes and lightbox display
   */
  const displayMediaDom = (medias) => {
    // refactorisé
    /** medias forEach
     * Display
     */
    medias.forEach((media) => {
      if (media.hasOwnProperty('image')) {
        // return boolean true of false, if media = image...
        mediasCards.append(createImageFactoryPage(media)); // ...create DOM image element
      } else if (media.hasOwnProperty('video')) {
        // else if media = video...
        mediasCards.append(createVideoFactoryPage(media)); // ...create DOM video element
      }
    });

    /** mediasCardsFigure
     * Loop, for... of
     */
    const mediasCardsFigure = document.querySelectorAll(
      '.photograph-media-cards > figure',
    );

    for (const [index, figure] of mediasCardsFigure.entries()) {
      // [index = key, figure = value]
      const mediasLikes = figure.getElementsByTagName('h2')[1].textContent;
      let mediasLikesNumber = parseInt(mediasLikes, 10); // typeof = 10 numbers
      mediasLikesTotal += mediasLikesNumber; // 10 résultats incrémentés





      // Likes, add or substract like to mediasLikesNumber
      const addLike = () => {
        mediasLikesNumber += 1; 
        figure.getElementsByTagName('h2')[1].textContent = mediasLikesNumber;
        mediasLikesTotal++;
        removeTotalLikes();
        updateTotalLikes();
      }
      const substractLike = () => {
        mediasLikesNumber -= 1;
        figure.getElementsByTagName('h2')[1].textContent = mediasLikesNumber;
        mediasLikesTotal--;
        removeTotalLikes();
        updateTotalLikes();
      }

      /** MediasCardsFigure
         * Likes, add or substract on click 
         */
      figure.querySelector('.heart').addEventListener('click', (e) => {
        figure.classList.toggle('is_liked'); // toute la card
        if (figure.classList.contains('is_liked')) {
          addLike();
        } else {
          substractLike(); 
        }
      });

      /** MediasCardsFigure
         * Likes, add or substract on keyup 
         */
       figure.querySelector('.heart').addEventListener('keyup', (event) => {
         event.preventDefault(); 
         event.stopPropagation(); ///////////////////////////// si problème, vérifier ici ////////////
         if (event.code === 'Enter') {
          figure.classList.toggle('is_liked'); // toute la card
            if (figure.classList.contains('is_liked')) {
              addLike();
            } else {
              substractLike(); 
            } 
         }
      });










        /** Lightbox
         * Get image or video media (used for click and keyboard)
         */
        const sourceMediaClicked = figure.firstChild.src;
        const titleMediaClicked = figure.getElementsByTagName('h2')[0].textContent;
        const mediaGetImage = () => {
          const img = document.createElement('img');
          const title = document.createElement('h2');
          const lightboxContainer = document.querySelector(
            '.lightbox__container',
          );
          img.src = sourceMediaClicked;
          title.textContent = titleMediaClicked;
          
          title.setAttribute('tabindex', '1') ///////////////////////
          title.setAttribute('role', 'Text') ///////////////////////
          title.setAttribute('aria-hidden', 'false') ///////////////////////
          title.setAttribute('aria-label', `${titleMediaClicked}`) /////////////////////// 
          title.classList.add("lightbox-title") /////////////////////
          
          lightboxContainer.appendChild(img);
          lightboxContainer.appendChild(title);
          currentLightboxIndex = index;
          displayLightbox();
        }
        const mediaGetVideo = () => {
          const video = document.createElement('video');
          const title = document.createElement('h2');
          video.src = sourceMediaClicked;
          title.textContent = titleMediaClicked;
          
          title.setAttribute('tabindex', '1') ///////////////////////
          title.setAttribute('role', 'Text') ///////////////////////
          title.setAttribute('aria-hidden', 'false') ///////////////////////
          title.setAttribute('aria-label', `${titleMediaClicked}`) ///////////////////////
          title.classList.add("lightbox-title") /////////////////////
          
          video.controls = true;
          const lightboxContainer = document.querySelector(
            '.lightbox__container',
          );
          lightboxContainer.append(video);
          lightboxContainer.append(title);
          currentLightboxIndex = index;
          displayLightbox();
        }

      /** Lightbox
         * Click on mediasCardsFigure to open
         */
      figure.firstChild.addEventListener('click', () => {
        if (sourceMediaClicked.match(imgRegex)) { 
          mediaGetImage(); 
        } else if (sourceMediaClicked.match(videoRegex)) { 
          mediaGetVideo(); 
        }
      });

      /** Lightbox
       * Press keyboard to open
       */ 
      figure.addEventListener('keyup', (event) => {
        event.preventDefault();
        if (event.code === 'Enter') {
          if (sourceMediaClicked.match(imgRegex)) { 
            mediaGetImage(); 
          } else if (sourceMediaClicked.match(videoRegex)) { 
            mediaGetVideo(); 
          } 
        }
      }); 
    } // for... 


    /**
     * Display total of likes DOM
     */
    const displayTotalLikes = () => {
      const divLikes = document.createElement('div');
      divLikes.classList.add('total_likes');
      const mediasLikesTotalCardDOM = `<h2 tabindex="4" id="likes">${mediasLikesTotal}</h2>
                                            <div class="heart filter_icons"><i class="fa fa-heart fa-lg" title="heart icon"></i></div>`;
      divLikes.innerHTML = mediasLikesTotalCardDOM;
      footer.prepend(divLikes);
    };
    displayTotalLikes(); // En dehors de la boucle, pour afficher le dernier résultat

    /**
     * Total likes upadate
     */
    const removeTotalLikes = () => {
      // cf. react useStat //
      document.getElementById('likes').textContent = '';
    };
    const updateTotalLikes = () => {
      document.getElementById('likes').textContent = mediasLikesTotal;
    };


    /** Lightbox
     * Close, left and right with keys
     */
    document.addEventListener('keyup', (event) => { // mis sur le même addEventListener
      event.stopImmediatePropagation();
      event.preventDefault();
      if (event.code === 'Escape') {
        closeLightbox();
      }
      if (event.code === 'ArrowLeft') {
        lightboxPrevious(medias);
      }
      if (event.code === 'ArrowRight') {
        lightBoxNext(medias);
      }
    });

    /**
     * lightbox, previous, next, close buttons
     */
    document
      .querySelector('.lightbox__prev')
      .addEventListener('click', (event) => {
        event.stopImmediatePropagation();
        event.preventDefault();
        lightboxPrevious(medias);
      });
    document
      .querySelector('.lightbox__next')
      .addEventListener('click', (event) => {
        event.stopImmediatePropagation();
        event.preventDefault();
        lightBoxNext(medias);
      });
    document
      .querySelector('.lightbox__close')
      .addEventListener('click', (event) => {
        event.stopImmediatePropagation();
        event.preventDefault();
        closeLightbox();
      });
  };

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  /** Medias gallery
   * Sort by name or popularity
   */
  displayMediaDom(medias); // Ajouté par Antoine
  const dropdownContainer = document.getElementById('dropdownContainer');
  medias.sort((a, b) => {
    if (a.likes > b.likes) {
      return -1;
    }
    if (a.likes < b.likes) {
      return 1;
    }
    return 0;
  });
  removeAllChildNodes(mediasCards);

  mediasLikesTotal = 0;
  document.querySelector('.total_likes').remove();
  displayMediaDom(medias); // lightbox index modifié

  // Sort by title function 
  const sortByTitle = () => {
    /* const element = document.querySelector('.option2') ////////////////////////////
    element.classList.add("clickPopularity"); //////////////////////////////////////////////////////// */

    document.querySelector('.dropbtn-text').textContent = "Titre"
  
    document.querySelector('.option1').setAttribute('data-sort', 'title')
    document.querySelector('.option1').setAttribute('value', 'title')
    document.querySelector('.listbox-option-text1').textContent = "Titre"

    document.querySelector('.option2').setAttribute('data-sort', 'popularity')
    document.querySelector('.option2').setAttribute('value', 'popularity')
    document.querySelector('.listbox-option-text2').textContent = "Popularité"

    medias.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    removeAllChildNodes(mediasCards);
    mediasLikesTotal = 0;
    displayMediaDom(medias); // lightbox index modifié
    document.querySelector('.total_likes').remove();
  }
  
  // Sort by popularity function 
  const sortByPopularity = () => {
    document.querySelector('.dropbtn-text').textContent = "Popularité"

    document.querySelector('.option1').setAttribute('data-sort', 'popularity')
    document.querySelector('.option1').setAttribute('value', 'popularity')
    document.querySelector('.listbox-option-text1').textContent = "Popularité"
    
    document.querySelector('.option2').setAttribute('data-sort', 'title')
    document.querySelector('.option2').setAttribute('value', 'title')
    document.querySelector('.listbox-option-text2').textContent = "Titre"

    medias.sort((a, b) => {
      if (a.likes > b.likes) {
        return -1;
      }
      if (a.likes < b.likes) {
        return 1;
      }
      return 0;
    });
    removeAllChildNodes(mediasCards);
    mediasLikesTotal = 0;
    document.querySelector('.total_likes').remove();
    displayMediaDom(medias); // lightbox index modifié
  }

// Sort by popularity with keyboard
const option2 = document.querySelector('.option2'); 
option2.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.code === 'Enter') {
    optionText = event.target.textContent.trim() // enlever les espaces avant et après 
    if (optionText === "Popularité") {
      sortByPopularity()
    } else if (optionText === "Titre"){
      sortByTitle()
    }
    //sortByTitle();
  }
});

  // Click on dropdown and sort  
  dropdownContainer.addEventListener('click', (e) => {
    if (e.target.textContent == 'Titre') {
      sortByTitle(); 
    } else if (e.target.textContent == 'Popularité') {
      sortByPopularity(); 
    }
  });
  
}; // displayMedias











/** Lightbox
* Navigation next
*/
const lightBoxNext = (medias) => {
  if (currentLightboxIndex === medias.length - 1) {
    // lorsque index[0] (et que click previous)...
    currentLightboxIndex = medias.length - medias.length; // ... index[last]
  } else {
    currentLightboxIndex += 1; 
  }

  /// ///////////////////// Refactoriser ////////////////////////
  const mediasCardsFigure = document.querySelectorAll(
    '.photograph-media-cards > figure',
  );
  const newElement = mediasCardsFigure[currentLightboxIndex];
  const newElementSrc = newElement.firstChild.src;
  const newElementTitle = newElement.getElementsByTagName('h2')[0].textContent; 
  const lightboxContainer = document.querySelector('.lightbox__container');
  lightboxContainer.innerHTML = '';

  if (newElementSrc.match(imgRegex)) {
    const img = document.createElement('img'); 
    img.src = newElementSrc;
    lightboxContainer.append(img);
    const h2 = document.createElement('h2'); 
    h2.innerHTML = newElementTitle; 
    lightboxContainer.append(h2); 
    h2.setAttribute('tabindex', '1') ///////////////////////
    h2.setAttribute('role', 'Text') ///////////////////////
    h2.setAttribute('aria-label', `${newElementTitle}`)
    h2.classList.add("lightbox-title") /////////////////////

  } else if (newElementSrc.match(videoRegex)) {
    const video = document.createElement('video'); 
    video.src = newElementSrc;
    video.controls = true;
    lightboxContainer.append(video);
    const h2 = document.createElement('h2');
    h2.innerHTML = newElementTitle; 
    lightboxContainer.append(h2); 
    h2.setAttribute('tabindex', '1') ///////////////////////
    h2.setAttribute('role', 'Text') ///////////////////////
    h2.setAttribute('aria-label', `${newElementTitle}`)
    h2.classList.add("lightbox-title") /////////////////////
  }
};

/** Lightbox
* Navigation previous
*/
const lightboxPrevious = (medias) => {
  if (currentLightboxIndex === 0) {
    // lorsque index[0] (et que click previous)...
    currentLightboxIndex = medias.length - 1; // ... index[last]
  } else {
    currentLightboxIndex -= 1; 
  }

  /// ///////////////////// Refactoriser ////////////////////////

  const mediasCardsFigure = document.querySelectorAll(
    '.photograph-media-cards > figure',
  );
  const newElement = mediasCardsFigure[currentLightboxIndex];
  // = div index[] //////////////// A revoir //
  const newElementSrc = newElement.firstChild.src; // = src URL of newElement index []
  const newElementTitle = newElement.getElementsByTagName('h2')[0].textContent; 
  const lightboxContainer = document.querySelector('.lightbox__container');
  lightboxContainer.innerHTML = ''; // empty existing contains

  if (newElementSrc.match(imgRegex)) {
    const img = document.createElement('img'); 
    img.src = newElementSrc;
    lightboxContainer.append(img);
    const h2 = document.createElement('h2'); 
    h2.innerHTML = newElementTitle; 
    lightboxContainer.append(h2); 
    h2.setAttribute('tabindex', '1') ///////////////////////
    h2.setAttribute('role', 'Text') ///////////////////////
    h2.setAttribute('aria-label', `${newElementTitle}`)
    h2.classList.add("lightbox-title") /////////////////////

  } else if (newElementSrc.match(videoRegex)) {
    const video = document.createElement('video'); 
    video.src = newElementSrc;
    video.controls = true;
    lightboxContainer.append(video);
    const h2 = document.createElement('h2'); 
    h2.innerHTML = newElementTitle; 
    lightboxContainer.append(h2); 
    h2.setAttribute('tabindex', '1') ///////////////////////
    h2.setAttribute('role', 'Text') ///////////////////////
    h2.setAttribute('aria-label', `${newElementTitle}`)
    h2.classList.add("lightbox-title") /////////////////////
  }
};
