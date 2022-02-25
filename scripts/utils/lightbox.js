const main = document.getElementById('main');

const onOpenModal = () => {
  main.setAttribute('aria-hidden', 'true');
};
const onCloseModal = () => {
  main.setAttribute('aria-hidden', 'false');
};

function displayLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'block';
  onOpenModal();
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
  const lightboxContainer = document.querySelector('.lightbox__container');
  lightboxContainer.innerHTML = '';
  onCloseModal();
}
