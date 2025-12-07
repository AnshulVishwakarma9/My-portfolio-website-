/**
 * script.js
 * Smooth scroll, project entrance animations and basic form validation.
 * No external libraries required beyond Bootstrap.
 */

document.addEventListener('DOMContentLoaded', function () {

  /* --------------------------
     Smooth scroll for anchor links
     -------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      // allow external anchor or empty hash
      var href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      // Use smooth scroll
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update focus for accessibility
      window.setTimeout(function () {
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }, 600);
    });
  });
  //  skills Animation
  /* ===== TAB SWITCHING ===== */
const tabs = document.querySelectorAll(".skill-tab");
const cards = document.querySelectorAll(".skill-card");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    let target = tab.getAttribute("data-target");

    cards.forEach((card) => {
      if (card.classList.contains(target)) {
        card.classList.remove("d-none");
        setTimeout(() => card.querySelector(".skill-item").classList.add("visible"), 100);
      } else {
        card.classList.add("d-none");
        card.querySelector(".skill-item").classList.remove("visible");
      }
    });
  });
});

/* ===== SCROLL REVEAL ANIMATION ===== */
const skillItems = document.querySelectorAll(".skill-item");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.3 }
);

skillItems.forEach((item) => skillObserver.observe(item));


  /* --------------------------
     Project cards: animate when entering viewport
     -------------------------- */
  var observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.08
  };

  var projectCards = document.querySelectorAll('.project-card');
  var projectObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  projectCards.forEach(function(card, i) {
    // stagger delay via inline style for nicer effect
    card.style.transitionDelay = (i * 70) + 'ms';
    projectObserver.observe(card);
  });


// google sheets form submission

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;

  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  fetch("https://script.google.com/macros/s/AKfycbzlTHQ_zmCD9_gWIMxJ0D_d7hBHM1BljmLidGgsANzwkkxz1QErKqRaAEcuSvD00b36/exec", {
    method: "POST",
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(result => {
    document.getElementById("formStatus").innerText = "Message sent successfully.";
    form.reset();
  })
  .catch(error => {
    document.getElementById("formStatus").innerText = "Error sending message.";
  });
});