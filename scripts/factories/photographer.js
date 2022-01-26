function photographerFactoryPage(dataPage) {
    const { name, id, portrait, city, country, tagline, price } = dataPage;
    const picture = `assets/photographersID/${portrait}`;

    function getPhotographerCardDOMPage() {
        const article = document.createElement( 'article' );
        const div = document.createElement( 'div' ); 
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h1 = document.createElement( 'h1' );
        h1.textContent = name; 
        const h2 = document.createElement( 'h2' ); 
        h2.textContent = city + ", " + country; 
        const h3 = document.createElement( 'h3' ); 
        h3.textContent = tagline; 

        article.appendChild(div);
        div.appendChild(h1);
        div.appendChild(h2); 
        div.appendChild(h3); 
        article.appendChild(img);
        return (article);
    }
    return { // factory function return un objet 
        name, 
        id, 
        portrait, 
        city, 
        country, 
        tagline, 
        price, 
        getPhotographerCardDOMPage
    }; 
}

// photographer.html?id=243
// ==> const query = window.location.search
// const urlParams = new URLSearchParams(query);
// urlParams.get('id') ==> 243
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find

// Afficher les infos du photographe, ses médias etc.
// Rendre les images cliquables 
// Au clic de l'image, la modale s'ouvre avec la même image en plus grand format