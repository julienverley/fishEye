/* // ----------------- à supprimer ? 
async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const photographers = [
        {
            "name": "Ma data test",
            "id": 1,
            "city": "Paris",
            "country": "France",
            "tagline": "Ceci est ma data test",
            "price": 400,
            "portrait": "account.png"
        },
        {
            "name": "Autre data test",
            "id": 2,
            "city": "Londres",
            "country": "UK",
            "tagline": "Ceci est ma data test 2",
            "price": 500,
            "portrait": "account.png"
        },
    ]
    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: [...photographers, ...photographers, ...photographers]}) // 3 x 2 photographers = 6
}
// ----------------- à supprimer ?   */


    async function displayData(photographers) { // async function displayData(photographers) { ? 
        const photographersSection = document.querySelector(".photographers-section"); // ajoute un node userCardDOM // ajout du s à photograoher(s)

        photographers.forEach((photographer) => { // photographer.s (any)
            const photographerModel = photographerFactory(photographer); // /factories/photographers.js
            const userCardDOM = photographerModel.getPhotographerCardDOM(); // /factories/photographers.js
            photographersSection.appendChild(userCardDOM); // ajoute un node userCardDOM
        });
    };

    async function init() { // async function init() { ? 
        // Récupère les datas des photographes

        fetch("./data/photographers.json")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const { photographers } = data; 
                displayData(photographers);
            });
    };

    init();