/**  Aria on main element
 * Used on lightbox and contact modals
 */
 const main = document.getElementById('main');
 const contactModal = document.getElementById('contact_modal')
 const onOpenModal = () => {
   main.setAttribute('aria-hidden', 'true');
   contactModal.setAttribute('tabindex', '1')
   main.setAttribute('tabindex', '-1')
 };
 const onCloseModal = () => {
   main.setAttribute('aria-hidden', 'false');
 };

/**  AddEventListeners
 * Close modal on key or click
 * */
document.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.code === 'Escape') {
    closeModal();
  }
});
document.querySelector('.modal__close').addEventListener('click', () => {
  closeModal();
});

/**  Open or close modal
 * 
 */
function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
  main.style.display = 'none'; 
  footer.style.visibility = 'hidden'; 
  onOpenModal();
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
  main.style.display = 'block'; 
  footer.style.visibility = 'visible'; 
  onCloseModal();
}
