/**
* Photographer header card DOM
*/
const photographerFactoryPage = (photographerObject) => {
// function attend un objet à traiter ; assigne les keys values aux 7 variables name, id etc.
  const {
    name, portrait, city, country, tagline,
  } = photographerObject; // ou const name = dataPage.name etc. pour chaque key
  const picture = `assets/photographersID/${portrait}`;

  const createPhotographerCardDOMPage = () => { // PhotographerCardDOMPage créée dans le DOM
    const article = document.createElement('article');
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.setAttribute('tabindex', '5')
    img.setAttribute('src', picture);
    img.setAttribute('alt', `${name} photographer portrait`);
    const h1 = document.createElement('h1');
    h1.textContent = name;
    h1.setAttribute('tabindex', '5')
    const h2 = document.createElement('h2');
    h2.textContent = `${city}, ${country}`;
    h2.setAttribute('tabindex', '5')
    const h3 = document.createElement('h3');
    h3.textContent = tagline;
    h3.setAttribute('tabindex', '5')
    const span = document.createElement('span');
    span.innerHTML = '<button tabindex="5" class="contact-button" role="button" onclick="displayModal()">Contactez-moi</button>';
    article.appendChild(div);
    div.appendChild(h1);
    div.appendChild(h2);
    div.appendChild(h3);
    article.appendChild(span);
    article.appendChild(img);
    return article;
  };

  return { // factory function returns un objet
    createPhotographerCardDOMPage,
  };
};

/**
 * Photographer gallery DOM
 */
const createImageFactoryPage = (mediaObject) => { // cf. Fromscratch 3/6 2'02
  const {
    photographerId, title, image, likes,
  } = mediaObject;
  // const images = `assets/photographersMedias/${photographerId}/${image}`;

  const figure = document.createElement('figure'); //
  figure.classList.add('card'); // .lightbox-element remplacé par .card
  figure.setAttribute('tabindex', '5'); /// ///////////////////////////// tabulation OK, comment cliquer ?

  const createImageFactoryPageDOM = // Gabarit, template literals // figure figcaption
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
  // const videos = `assets/photographersMedias/${photographerId}/${video}`;

  const figure = document.createElement('figure');
  figure.classList.add('card');
  figure.setAttribute('tabindex', '5'); /// ///////////////////////////// tabulation OK, comment cliquer ?

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
