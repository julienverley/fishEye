/**  Open or close lightbox
 * 
 */
function displayLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'block';
}
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
  const lightboxContainer = document.querySelector('.lightbox__container');
  lightboxContainer.innerHTML = '';
}
