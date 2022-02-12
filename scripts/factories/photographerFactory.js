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

// const createImageFactoryPageDOM 
const createImageFactoryPage = (mediaObject) => { // cf. Fromscratch 3/6 2'02
    const { id, photographerId, title, image, likes, date, price } = mediaObject;
    const images = `assets/photographersMedias/${photographerId}/${image}`;
 
    const div = document.createElement('div'); // -> figure
    div.classList.add("lighbox-element"); 

    const imageElement = document.createElement('img');
    imageElement.setAttribute("src", images)

    // gabarit en utilisant `    `
    // -> figcaption ... ... ... ... *** *** *** *** 

    const h1 = document.createElement ('h1'); // const mediaTitle = document.createElement ('mediaTitle'); CSS : h1
    h1.textContent = title; // mediaTitle.textContent = title; 
    // h1.classList.add("lightbox-media-title") // DOM ≠ lightbox
    
    const h2 = document.createElement ('h2'); // const mediaTitle = document.createElement ('mediaTitle'); CSS : h1
    h2.textContent = likes; // mediaTitle.textContent = title; 

    // const mediaLikes = document.createElement ('mediaLikes'); CSS : h1 
    // mediaLikes.textContent = likes; + heart fontAwesome

    div.appendChild(imageElement); // append ?
    div.appendChild(h1);
    div.appendChild(h2);

    
    return div 

    // Gabarit, template literals ` `
    /* const createImageFactoryPageDOM = 
    `<div class="lightbox-element">
        <img src="./assets/photographersMedias/${photographerId}/${image}" alt="${title}"></img>
        <h1>{title}</h1>
    </div>`;  */
}
 
const createVideoFactoryPage = (mediaObject) => {
    const { id, photographerId, title, video, likes, date, price } = mediaObject;
    const videos = `assets/photographersMedias/${photographerId}/${video}`;

    const div = document.createElement('div'); 
    div.classList.add("lighbox-element"); 
    const videoElement = document.createElement('video'); // image miniature
    
    videoElement.classList.add("video"); 
    videoElement.setAttribute("src", videos)
    const h1 = document.createElement('h1');
    h1.textContent = title; 
    // h1.textContent = likes; 

    div.appendChild(videoElement);
    div.appendChild(h1);

    return div
} 