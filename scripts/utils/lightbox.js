function displayLightbox() {
    const lightbox = document.getElementById("lightbox");
	lightbox.style.display = "block";
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
    const lightboxContainer = document.querySelector('.lightbox__container')
    lightboxContainer.innerHTML = ""
    // lightboxContainer.removeChild(lightboxContainer.childNodes[1]) pour le titre
}

// closeLightbox.addEventListener("click", closeLightbox); // OK // finalement pas OK depuis le displayLightbox(index)
/* displayLightbox.addEventListener("click", displayLightbox); // OK */