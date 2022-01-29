function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographersID/${portrait}`;

    function getPhotographerCardDOM() { 
        // remplacer par const photographerCard = `(html) <a href...` ?
        const article = document.createElement( 'article' );
        article.setAttribute('id', id) // id des photographes sur articles 
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name; 
        const h4 = document.createElement( 'h4' ); 
        h4.textContent = city + ", " + country; 
        const h5 = document.createElement( 'h5' ); 
        h5.textContent = tagline; 
        const h6 = document.createElement( 'h6' ); 
        h6.textContent = price + "€/jour"; 

        article.appendChild(img); 
        article.appendChild(h2);
        article.appendChild(h4); 
        article.appendChild(h5); 
        article.appendChild(h6); 
        
        return (article);
    }
    return { // factory function return un objet, avec les deux fonctions 
        name, 
        id, 
        portrait, 
        city, 
        country, 
        tagline, 
        price, 
        getPhotographerCardDOM 
    }; 
}