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
 * ... to close modal on escape or click
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
  onOpenModal();
  console.log(onOpenModal)
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
  onCloseModal();
}
