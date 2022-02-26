const dropdownArrow = document.getElementById('dropdownArrow'); 

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showDropdown() {
  document.getElementById('dropdownContainer').classList.toggle('show'); 
}

// Open dropdown with keyboard
dropdownArrow.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.code === 'Enter') {
    showDropdown();
  }
});

// Close dropdown if user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.fa-chevron-down')) {
    const dropdowns = document.getElementsByClassName('dropdown-content'); // const dropdowns = document.getElementsByClassName('dropdown-content');
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}; 
