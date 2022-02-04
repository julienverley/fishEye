/* 
Main / Photographer card header  
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
        const button = document.createElement ('button'); 
        button.innerHTML = '<button class="contact-button" onclick="displayModal()">Contactez-moi</button>'; 

        article.appendChild(div);
        div.appendChild(h1);
        div.appendChild(h2); 
        div.appendChild(h3); 
        article.appendChild(button); 
        article.appendChild(img);

        return (article); // Pourquoi ?? 
    }
    return { // factory function returns un objet 
        name, 
        id, 
        portrait, 
        city, 
        country, 
        tagline, 
        price, 
        createPhotographerCardDOMPage
    }; 
}

/* 
Main / Photographer medias 
*/
const mediasFactoryPage = (mediaObject) => { // function attend un objet à traiter ; assigne les keys values aux 7 variables name, id etc.
    const { id, photographerId, title, image, video, likes, date, price } = mediaObject; // ou const name = dataPage.name etc. pour chaque key 
    
    const medias = `assets/photographersMedias/${photographerId}/${image}`; // ajouter ${video}
    
    console.table(medias) // J'essaye de me baser sur medias pour accéder aux médias avec const links !!??

    const createMediasCardDOMPage = () => { // PhotographerCardDOMPage créée dans le DOM
        
        const div = document.createElement('div'); 
        /* const a = document.createElement('a'); 
        a.setAttribute("href", medias); 
        a.classList.add('lightbox-media');  */
        const img = document.createElement('img');
        img.setAttribute("src", medias)
        const h1 = document.createElement ('h1'); 
        h1.textContent = title; 
        /* div.append(a);  */
        div.append(img);
        div.append(h1); 

        return (div); // Pourquoi ? 
    }
    return { // factory function returns un objet  
       /*  id, 
        photographerId, 
        title, 
        image, //video ?
        likes, 
        date, 
        price, */
        createMediasCardDOMPage // return : j'ai besoin de clarifications  
    }; 
}


// Afficher les infos du photographe, ses médias etc.
// Rendre les images cliquables 
// Au clic de l'image, la modale s'ouvre avec la même image en plus grand format