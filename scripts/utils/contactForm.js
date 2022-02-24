document.addEventListener('keyup', (event) => {
    event.preventDefault()
    if (event.code === "Escape") {
        closeModal(); 
    }
}); 

document.querySelector('.modal__close').addEventListener('click', () => { 
    closeModal(); 
}); 


function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    onOpenModal()
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    onCloseModal()
}




// ajouter les regex, erreurs, bordures ?

