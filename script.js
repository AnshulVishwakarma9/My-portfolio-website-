const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    console.log(" menu toggle clicked");
});
const themeToggleBtn = document.getElementById("theme-toggle-btn");
themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    console.log("Theme toggled");
});