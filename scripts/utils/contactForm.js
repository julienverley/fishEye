// CONTACT FORM

// Contact modal informations 
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

// On keyup event, close contact modal
document.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.code === 'Escape') {
    closeModal();
  }
});
// On click event, close contact modal
document.querySelector('.modal__close').addEventListener('click', () => {
  closeModal();
});

// Display contact modal
function displayModal() { // onclick
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
  main.style.display = 'none'; 
  footer.style.visibility = 'hidden'; 
  onOpenModal();
}

// Close contact modal
function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
  main.style.display = 'block'; 
  footer.style.visibility = 'visible'; 
  onCloseModal();
}
