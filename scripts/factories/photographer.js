// ESSAIS


function photographerFactoryPage(dataPage) {
    const { name, id, portrait, city, country, tagline, price } = dataPage;
    const picture = `assets/photographersID/${portrait}`;


    function getPhotographerCardDOM() {
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
    return { name, id, portrait, city, country, tagline, price, getPhotographerCardDOM } 
}