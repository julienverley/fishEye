/** 
* Photographer header card DOM
*/
const photographerFactoryPage = (photographerObject) => { // function attend un objet à traiter ; assigne les keys values aux 7 variables name, id etc.
    const { name, id, portrait, city, country, tagline, price } = photographerObject; // ou const name = dataPage.name etc. pour chaque key 
    const picture = `assets/photographersID/${portrait}`;

    const createPhotographerCardDOMPage = () => { // PhotographerCardDOMPage créée dans le DOM
        const article = document.createElement('article');
        const div = document.createElement('div'); 
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const h1 = document.createElement('h1');
        h1.textContent = name; 
        const h2 = document.createElement('h2'); 
        h2.textContent = city + ", " + country; 
        const h3 = document.createElement('h3'); 
        h3.textContent = tagline; 
        const span = document.createElement ('span'); 
        span.innerHTML = '<button class="contact-button" onclick="displayModal()">Contactez-moi</button>'; 
        article.appendChild(div);
        div.appendChild(h1);
        div.appendChild(h2); 
        div.appendChild(h3); 
        article.appendChild(span); 
        article.appendChild(img);

        return article
    }
    
    return { // factory function returns un objet 
        createPhotographerCardDOMPage
    }; 
}

/**
 * Photographer gallery DOM
 */ 
const createImageFactoryPage = (mediaObject) => { // cf. Fromscratch 3/6 2'02
    const { id, photographerId, title, image, likes, date, price } = mediaObject;
    // const images = `assets/photographersMedias/${photographerId}/${image}`;
    
    const figure = document.createElement('figure'); // 
    figure.classList.add('card') // .lightbox-element remplacé par .card

    const createImageFactoryPageDOM = // Gabarit, template literals // figure figcaption
    `<img src="./assets/photographersMedias/${photographerId}/${image}" alt="${title}"></img>
        <div>
            <h2>${title}</h2>
            <div>
                <h2 class="likes">${likes}</h2>
                <div class="heart filter_icons"><i class="fa fa-heart fa-lg"></i></div>
            </div>
        </div>`; 
    
    figure.innerHTML = createImageFactoryPageDOM;
    return figure 
}
 
const createVideoFactoryPage = (mediaObject) => {
    const { id, photographerId, title, video, likes, date, price } = mediaObject;
    // const videos = `assets/photographersMedias/${photographerId}/${video}`;

    const figure = document.createElement('figure'); 
    figure.classList.add("card"); 

    const createVideoFactoryPageDOM = 
    `<video class="video" src="./assets/photographersMedias/${photographerId}/${video}" alt="${title}"></video>
        <div>
            <h2>${title}</h2>
            <div>
                <h2 class="likes">${likes}</h2>
                <div class="heart filter_icons heart"><i class="fa fa-heart fa-lg"></i></div>
            </div>
        </div>`;   

    figure.innerHTML = createVideoFactoryPageDOM;
    return figure
} 



