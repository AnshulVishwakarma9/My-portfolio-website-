// navbar-toggler-script
// Add this to your existing JS block from Method 1 if you want body scroll lock
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const body = document.body;

  navbarToggler.addEventListener('click', function() {
    body.classList.toggle('menu-open'); // Toggles overflow: hidden;
  });
});

