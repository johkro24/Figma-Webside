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

// Submit login form
document.getElementById('loginForm').onsubmit = function (event) {
  event.preventDefault();
  const data = new FormData(this);

  fetch('/login', {
    method: 'POST',
    body: data
  })
  .then(response => response.json())
  .then(result => {
    if (result.success) {
      alert('Login successful!');
      loginOverlay.style.display = 'none'; // Close the overlay
    } else {
      alert('Login failed: ' + result.message);
    }
  });
};

// Submit register form
document.getElementById('registerForm').onsubmit = function (event) {
  event.preventDefault();
  const data = new FormData(this);

  fetch('/register', {
    method: 'POST',
    body: data
  })
  .then(response => response.json())
  .then(result => {
    if (result.success) {
      alert('Registration successful!');
      registerOverlay.style.display = 'none'; // Close the overlay
    } else {
      alert('Registration failed: ' + result.message);
    }
  });
};
