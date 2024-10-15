// Display the "Logg Inn" overlay
const loginOverlay = document.getElementById('login-overlay');
const loginBtn = document.querySelector('.nav-links a[href="#login"]'); // Updated selector for "Logg Inn" button
const closeBtn = document.getElementById('close-btn');

// Display the "Opprett Bruker" overlay
const registerOverlay = document.getElementById('register-overlay'); // Second overlay for "Opprett Bruker"
const registerBtn = document.querySelector('.cta'); // "Opprett Bruker" button
const closeRegisterBtn = document.getElementById('close-register-btn');

// Open Logg Inn modal when clicking "Logg Inn"
loginBtn.addEventListener('click', function (e) {
  e.preventDefault();
  loginOverlay.style.display = 'flex';
});

// Close the modal by clicking outside of the login box (Logg Inn)
loginOverlay.addEventListener('click', function (e) {
  if (e.target === loginOverlay) {
    loginOverlay.style.display = 'none';
  }
});

// Open Opprett Bruker modal when clicking "Opprett bruker"
registerBtn.addEventListener('click', function (e) {
  e.preventDefault();
  registerOverlay.style.display = 'flex';
});

// Close the modal by clicking outside of the register box (Opprett Bruker)
registerOverlay.addEventListener('click', function (e) {
  if (e.target === registerOverlay) {
    registerOverlay.style.display = 'none';
  }
});