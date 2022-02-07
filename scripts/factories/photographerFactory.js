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
        const span = document.createElement ('span'); 
        span.innerHTML = '<button class="contact-button" onclick="displayModal()">Contactez-moi</button>'; 
        article.appendChild(div);
        div.appendChild(h1);
        div.appendChild(h2); 
        div.appendChild(h3); 
        article.appendChild(span); 
        article.appendChild(img);

        return (article); // ? 
    }
    return { // factory function returns un objet 
        createPhotographerCardDOMPage
    }; 
}

/* 
Main / Photographer medias 
*/
const mediasFactoryPage = (mediaObject) => { // function attend un objet à traiter ; assigne les keys values aux 7 variables name, id etc.
    const { id, photographerId, title, image, video, likes, date, price } = mediaObject; // ou const name = dataPage.name etc. pour chaque key 
    
    const images = `assets/photographersMedias/${photographerId}/${image}`; 
    const videos = `assets/photographersMedias/${photographerId}/${video}`; 
    
    console.table(images) // J'essaye de me baser sur medias pour accéder aux médias avec const links !!??

    const createMediasCardDOMPage = () => { // PhotographerCardDOMPage créée dans le DOM
        
        if (mediaObject = "image") {
            const div = document.createElement('div'); 
            const img = document.createElement('img');
            img.setAttribute("src", images)
            const h1 = document.createElement ('h1'); 
            h1.textContent = title; 
    
            div.append(img);
            div.append(h1); 
    
            return (div); 

        } if (mediaObject = "video") {
            const div = document.createElement('div'); 
            const video = document.createElement('video');
            img.setAttribute("src", videos)
            const h1 = document.createElement ('h1'); 
            h1.textContent = title; 
    
            div.append(video);
            div.append(h1); 
    
            return (div); 
        }
    }
    return { // factory function returns un objet  
        createMediasCardDOMPage //    
    }; 
}