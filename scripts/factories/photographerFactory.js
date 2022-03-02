// Photographer page factory

// Create photographer page DOM header card   
const photographerFactoryPage = (photographerObject) => { // Get photographer object
  const {
    name, portrait, city, country, tagline,
  } = photographerObject; // key/value name, portrait etc. 
  const picture = `assets/photographersID/${portrait}`;

  const createPhotographerCardDOMPage = () => { // Build DOM
    const article = document.createElement('article');
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.setAttribute('tabindex', '4')
    img.setAttribute('src', picture);
    img.setAttribute('alt', `${name}`);
    const h1 = document.createElement('h1');
    h1.textContent = name;
    h1.setAttribute('tabindex', '4')
    const h2 = document.createElement('h2');
    h2.textContent = `${city}, ${country}`;
    h2.setAttribute('tabindex', '4')
    const h3 = document.createElement('h3');
    h3.textContent = tagline;
    h3.setAttribute('tabindex', '4')
    const span = document.createElement('span');
    span.innerHTML = '<button tabindex="4" class="contact-button" role="button" onclick="displayModal()">Contactez-moi</button>';
    article.appendChild(div);
    div.appendChild(h1);
    div.appendChild(h2);
    div.appendChild(h3);
    article.appendChild(span);
    article.appendChild(img);
    return article;
  };

  return { // an object
    createPhotographerCardDOMPage,
  };
};

// Create photographer page DOM gallery figures   
const createImageFactoryPage = (mediaObject) => {
  const {
    photographerId, title, image, likes,
  } = mediaObject;
  const figure = document.createElement('figure'); 
  figure.classList.add('card'); 
  figure.setAttribute('tabindex', '5');

  const createImageFactoryPageDOM = // Gabarit or template literals
    `<img src="./assets/photographersMedias/${photographerId}/${image}" alt="${title}"></img>
        <div>
            <h2 tabindex="5">${title}</h2>
            <div>
                <h2 tabindex="5" class="likes">${likes}</h2>
                <div tabindex="5" aria-label="likes" class="heart filter_icons"><i class="fa fa-heart fa-lg" title="heart icon"></i></div>
            </div>
        </div>`;

  figure.innerHTML = createImageFactoryPageDOM;
  return figure;
};

const createVideoFactoryPage = (mediaObject) => {
  const {
    photographerId, title, video, likes,
  } = mediaObject;
  const figure = document.createElement('figure');
  figure.classList.add('card');
  figure.setAttribute('tabindex', '5');

  const createVideoFactoryPageDOM = `<video class="video" src="./assets/photographersMedias/${photographerId}/${video}" alt="${title}"></video>
        <div>
            <h2 tabindex="5">${title}</h2>
            <div>
                <h2 tabindex="5" class="likes">${likes}</h2>
                <div tabindex="5" class="heart filter_icons"><i class="fa fa-heart fa-lg" title="heart icon"></i></div>
            </div>
        </div>`;

  figure.innerHTML = createVideoFactoryPageDOM;
  return figure;
};
