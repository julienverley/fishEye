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

        return article
    }
    return { // factory function returns un objet 
        createPhotographerCardDOMPage
    }; 
}



const createImageFactoryPage = (mediaObject) => {
    const { id, photographerId, title, image, likes, date, price } = mediaObject;
    const images = `assets/photographersMedias/${photographerId}/${image}`;

    const div = document.createElement('div'); 
    const img = document.createElement('img');
    img.setAttribute("src", images)
    const h1 = document.createElement ('h1');
    h1.textContent = title; 

    div.append(img);
    div.append(h1);
    
    console.log(div)
    return div 
}
// return {imageFactoryPage}; 
 


const createVideoFactoryPage = (mediaObject) => {
    const { id, photographerId, title, video, likes, date, price } = mediaObject;
    const videos = `assets/photographersMedias/${photographerId}/${video}`;

    const div = document.createElement('div'); 
    const videoElement = document.createElement('video');
    // Montrer une image miniature de la vidéo // OK ? 
    // videoElement.insertAdjacentHTML ('afterbegin', 'controls'); // controls à ajouter dans la modale 
    videoElement.classList.add("video"); 
    videoElement.setAttribute("src", videos)
    const h1 = document.createElement ('h1');
    h1.textContent = title; 

    div.append(videoElement);
    div.append(h1);

    console.log(div); 
    return div
} 
// return {videoFactoryPage};  



/* 
Main / Photographer medias 
*/
// A DUPLIQUER, UNE POUR LES IMAGES, UNE POUR LES VIDEOS 

/* const mediasFactoryPage = (mediaObject) => { // function attend un objet à traiter ; assigne les keys values aux 7 variables name, id etc.
    const { id, photographerId, title, image, video, likes, date, price } = mediaObject; // ou const name = dataPage.name etc. pour chaque key 
    
    // console.log(video); 

    const images = `assets/photographersMedias/${photographerId}/${image}`; 
    const videos = `assets/photographersMedias/${photographerId}/${video}`; 
    
    console.table(images)

    const createMediasCardDOMPage = () => { // PhotographerCardDOMPage créée dans le DOM
        
        if (mediaObject = 'image') { // image même sur video // == 
            console.log(mediaObject)
            const div = document.createElement('div'); 
            const img = document.createElement('img');
            img.setAttribute("src", images); 
            const h1 = document.createElement ('h1'); 
            h1.textContent = title; 
    
            div.append(img);
            div.append(h1); 
    
            return (div); 

        } else if (mediaObject = 'video') {
            console.log(mediaObject); // rien 
            const div = document.createElement('div'); 
            const video = document.createElement('video');
            img.setAttribute("src", videos); 
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
*/