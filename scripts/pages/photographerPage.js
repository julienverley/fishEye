// Photographer page 

const imgRegex = /^.*\.(jpg)$/;
const videoRegex = /^.*\.(mp4)$/;
const footer = document.querySelector('.footer');
let currentLightboxIndex = 0;
let mediasLikesTotal = 0;

// Get photographers datas from .json
const initPhotographerPage = () => {
  fetch('./data/photographers.json') // Get .json
    .then((response) => response.json()) // Make JS object
    .then((data) => {
      const searchParams = new URLSearchParams(window.location.search); // Make a new empty URLSearchParams object
      const photographerId = searchParams.get('id'); // Return the first found id value 
      const photographerToDisplay = data.photographers.find( // = objects containing this photographer id
        (element) => element.id == photographerId,
      );
      const mediasToDisplay = data.media.filter( // = objects containing this photographer id
        (element) => element.photographerId == photographerId,
      );
      const priceToDisplay = photographerToDisplay.price;
      displayPhotographer(photographerToDisplay); // Launch displayPhotographer
      displayMedias(mediasToDisplay); // Launch displayMedias
      displayPrice(priceToDisplay); // Launch displayPrice
      document.getElementById('photographerNameContact').textContent = photographerToDisplay.name;
    });
};
initPhotographerPage(); // Launch init


 // HEADER 
 // Display photographer card
const displayPhotographer = (photographer) => {
  const photographerHeader = document.querySelector('.photograph-header'); // Add userCardDOM node
  const photographerModel = photographerFactoryPage(photographer); // Object keys/values
  const userCardDOM = photographerModel.createPhotographerCardDOMPage(); 
  photographerHeader.appendChild(userCardDOM);
};


 // FOOTER
 // Display price 
const displayPrice = (price) => {
  const divPrice = document.createElement('div');
  divPrice.classList.add('price');
  const priceCardDOM = `<h2 tabindex="4">${price}€ / jour</h2>`;
  divPrice.innerHTML = priceCardDOM;
  footer.append(divPrice);
};


// MEDIAS GALLERY
// Display medias, display lightbox, sort medias
const displayMedias = (medias) => {
  const mediasCards = document.querySelector('.photograph-media-cards'); // Add mediasCards node 

  // MEDIAS DOM
  // Likes and lightbox display
  const displayMediaDom = (medias) => {
    
    // IMAGE OR VIDEO (cf. factory)
    medias.forEach((media) => {
      if (media.hasOwnProperty('image')) { // Return boolean, true of false, if image...
        mediasCards.append(createImageFactoryPage(media)); 
      } else if (media.hasOwnProperty('video')) {
        mediasCards.append(createVideoFactoryPage(media)); 
      }
    });

    // FIGURES 
    // Loop, for... of, creation of likes and lightbox
    const mediasCardsFigure = document.querySelectorAll(
      '.photograph-media-cards > figure',
    );
    for (const [index, figure] of mediasCardsFigure.entries()) { // [index(key), figure(value)]
      const mediasLikes = figure.getElementsByTagName('h2')[1].textContent;
      let mediasLikesNumber = parseInt(mediasLikes, 10); // typeof: numbers
      mediasLikesTotal += mediasLikesNumber; 

      // LIKES 
      // Add or substract like to figure and total
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
      // LIKES 
      // Event: click 
      figure.querySelector('.heart').addEventListener('click', () => {
        figure.classList.toggle('is_liked'); 
        if (figure.classList.contains('is_liked')) {
          addLike();
        } else {
          substractLike(); 
        }
      });
       // LIKES 
       // Event: keyup 
       figure.querySelector('.heart').addEventListener('keyup', (event) => {
         event.preventDefault(); 
         event.stopPropagation();
         if (event.code === 'Enter') {
          figure.classList.toggle('is_liked'); 
            if (figure.classList.contains('is_liked')) {
              addLike();
            } else {
              substractLike(); 
            } 
         }
      });

      // LIGHTBOX
      // Get image or video media (used for click and keyboard)
      const sourceMediaClicked = figure.firstChild.src;
      const titleMediaClicked = figure.getElementsByTagName('h2')[0].textContent;
      const lightboxContainer = document.querySelector(
        '.lightbox__container',
      );
      const title = document.createElement('h2');
      // Add informations
      const mediaImageVideoInformations = () => {
        title.textContent = titleMediaClicked;
        title.setAttribute('tabindex', '1')
        title.setAttribute('role', 'Text') 
        title.setAttribute('aria-hidden', 'false') 
        title.setAttribute('aria-label', `${titleMediaClicked}`)  
        title.classList.add("lightbox-title")
        currentLightboxIndex = index;
        lightboxContainer.appendChild(title);
      }
      // Get image or video and display
      const mediaGetImage = () => {
        const img = document.createElement('img');
        img.src = sourceMediaClicked;
        lightboxContainer.appendChild(img);
        mediaImageVideoInformations(); 
        displayLightbox(); // lightbox.js
      }
      const mediaGetVideo = () => {
        const video = document.createElement('video');
        video.src = sourceMediaClicked;
        video.controls = true;
        lightboxContainer.append(video);
        mediaImageVideoInformations();
        displayLightbox();
      }
      // Open on click
      figure.firstChild.addEventListener('click', () => {
        if (sourceMediaClicked.match(imgRegex)) { 
          mediaGetImage(); 
        } else if (sourceMediaClicked.match(videoRegex)) { 
          mediaGetVideo(); 
        }
      });
      // Open on keyup
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
    } // for... of

    // LIKES 
    // Display total likes
    const displayTotalLikes = () => {
      const divLikes = document.createElement('div');
      divLikes.classList.add('total_likes');
      const mediasLikesTotalCardDOM = `<h2 tabindex="4" id="likes">${mediasLikesTotal}</h2>
                                            <div class="heart filter_icons"><i class="fa fa-heart fa-lg" title="heart icon"></i></div>`;
      divLikes.innerHTML = mediasLikesTotalCardDOM;
      footer.prepend(divLikes);
    };
    displayTotalLikes(); 

    // Update total likes
    const removeTotalLikes = () => {
      document.getElementById('likes').textContent = '';
    };
    const updateTotalLikes = () => {
      document.getElementById('likes').textContent = mediasLikesTotal;
    };
    
    // LIGHTBOX
    // Keyup events, navigation 
    document.addEventListener('keyup', (event) => { 
      event.stopImmediatePropagation();
      event.preventDefault();
      if (event.code === 'Escape') {
        closeLightbox();
      }
      if (event.code === 'ArrowLeft') {
        lightboxPrevious(medias);
      }
      if (event.code === 'ArrowRight') {
        lightboxNext(medias);
      }
    });
    // Click events, navigation
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
        lightboxNext(medias);
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

  // SORT 
  displayMediaDom(medias); 
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
  displayMediaDom(medias);

  // Sort by title  
  const sortByTitle = () => {
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
    displayMediaDom(medias);
    document.querySelector('.total_likes').remove();
  }
  
  // Sort by popularity  
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
    displayMediaDom(medias);
  }

  // Keyup event, dropdown, sort by popularity or title
  const option2 = document.querySelector('.option2'); 
  option2.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.code === 'Enter') {
      optionText = event.target.textContent.trim() // Remove spaces
      if (optionText === "Popularité") {
        sortByPopularity()
      } else if (optionText === "Titre"){
        sortByTitle()
      }
    }
  });

  // Click event, dropdown, sort by popularity or title
  dropdownContainer.addEventListener('click', (e) => {
    if (e.target.textContent == 'Titre') {
      sortByTitle(); 
    } else if (e.target.textContent == 'Popularité') {
      sortByPopularity(); 
    }
  });
  
}; // displayMedias


// LIGHTBOX
// Navigation, next
const lightboxNext = (medias) => {
  if (currentLightboxIndex === medias.length - 1) {
    currentLightboxIndex = medias.length - medias.length;
  } else {
    currentLightboxIndex += 1; 
  }
  const mediasCardsFigure = document.querySelectorAll(
    '.photograph-media-cards > figure',
  );
  const newElement = mediasCardsFigure[currentLightboxIndex];
  const newElementSrc = newElement.firstChild.src;
  const newElementTitle = newElement.getElementsByTagName('h2')[0].textContent; 
  const lightboxContainer = document.querySelector('.lightbox__container');
  lightboxContainer.innerHTML = '';
  
  const lightboxImageVideoInformation = () => {
    const h2 = document.createElement('h2'); 
    h2.innerHTML = newElementTitle; 
    lightboxContainer.append(h2); 
    h2.setAttribute('tabindex', '1')
    h2.setAttribute('role', 'Text') 
    h2.setAttribute('aria-label', `${newElementTitle}`)
    h2.classList.add("lightbox-title") 
  }

  if (newElementSrc.match(imgRegex)) {
    const img = document.createElement('img'); 
    img.src = newElementSrc;
    lightboxContainer.append(img);
    lightboxImageVideoInformation(); 
    

  } else if (newElementSrc.match(videoRegex)) {
    const video = document.createElement('video'); 
    video.src = newElementSrc;
    lightboxContainer.append(video);
    video.controls = true;
    lightboxImageVideoInformation(); 
  }
};

// Navigation, previous
const lightboxPrevious = (medias) => {
  if (currentLightboxIndex === 0) {
    currentLightboxIndex = medias.length - 1;
  } else {
    currentLightboxIndex -= 1; 
  }
  const mediasCardsFigure = document.querySelectorAll(
    '.photograph-media-cards > figure',
  );
  const newElement = mediasCardsFigure[currentLightboxIndex];
  const newElementSrc = newElement.firstChild.src; 
  const newElementTitle = newElement.getElementsByTagName('h2')[0].textContent; 
  const lightboxContainer = document.querySelector('.lightbox__container');
  lightboxContainer.innerHTML = ''; 

  const lightboxImageVideoInformation = () => {
    const h2 = document.createElement('h2'); 
    h2.innerHTML = newElementTitle; 
    lightboxContainer.append(h2); 
    h2.setAttribute('tabindex', '1')
    h2.setAttribute('role', 'Text') 
    h2.setAttribute('aria-label', `${newElementTitle}`)
    h2.classList.add("lightbox-title") 
  }

  if (newElementSrc.match(imgRegex)) {
    const img = document.createElement('img'); 
    img.src = newElementSrc;
    lightboxContainer.append(img);
    lightboxImageVideoInformation(); 

  } else if (newElementSrc.match(videoRegex)) {
    const video = document.createElement('video'); 
    video.src = newElementSrc;
    lightboxContainer.append(video);
    video.controls = true;
    lightboxImageVideoInformation(); 
  }
};
