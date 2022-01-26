    function displayData(photographers) { // async function displayData(photographers) { ? 
        const photographersSection = document.querySelector(".photographers-section"); // ajoute un node userCardDOM // ajout du s à photograoher(s)

        photographers.forEach((photographer) => { // 
            const photographerModel = photographerFactory(photographer); // /factories/photographers.js
            const userCardDOM = photographerModel.getPhotographerCardDOM(); // /factories/photographers.js
            photographersSection.appendChild(userCardDOM); // ajoute un node userCardDOM

            userCardDOM.addEventListener('click', () => { // au click...
                window.location.href = `photographer.html?id=${photographer.id}` // ...URL photographer + ID                
            })
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

    // event au click qui vise chaque id 
/*     const photographer1 = document.getElementById("243")
    console.log(photographer1.innerHTML) */