function displayLightbox() {
    const lightbox = document.getElementById("lightbox");
	lightbox.style.display = "block";
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
}

closeLightbox.addEventListener("click", closeLightbox); // OK // finalement pas OK depuis le displayLightbox(index)
/* displayLightbox.addEventListener("click", displayLightbox); // OK */