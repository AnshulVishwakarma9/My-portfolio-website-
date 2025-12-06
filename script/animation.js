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

  /* --------------------------
     Simple contact form validation (HTML5 + custom)
     -------------------------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // rely on native validity first
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      status.textContent = 'Please correct the errors above.';
      status.classList.remove('text-success');
      status.classList.add('text-danger');
      return;
    }

    // Additional basic checks (optional)
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();

    if (name.length < 2 || message.length < 10) {
      form.classList.add('was-validated');
      status.textContent = 'Please provide valid details.';
      status.classList.remove('text-success');
      status.classList.add('text-danger');
      return;
    }

    // Simulate sending (since no backend). Replace with real API call as needed.
    status.textContent = 'Sending message…';
    status.classList.remove('text-danger');
    status.classList.add('text-muted');

    // fake async send
    setTimeout(function () {
      form.reset();
      form.classList.remove('was-validated');
      status.textContent = 'Thanks — your message has been sent (demo).';
      status.classList.remove('text-muted');
      status.classList.add('text-success');
    }, 900);
  });

  /* --------------------------
     Small accessibility helper: add keyboard focus indicators for interactive elements
     -------------------------- */
  document.body.addEventListener('keyup', function (e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-focus');
    }
  });
});
