// DROPDOWN MENU

const dropdownArrow = document.getElementById('dropdownArrow'); 

// On click event, show or hide dropdown content 
function showDropdown() {
  document.getElementById('dropdownContainer').classList.toggle('show'); 
}

// On keyup, open dropdown 
dropdownArrow.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.code === 'Enter') {
    showDropdown();
  }
});

// Close dropdown if user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.fa-chevron-down')) {
    const dropdowns = document.getElementsByClassName('dropdown-content'); 
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}; 
