// Get modal elements
const loginOverlay = document.getElementById('login-overlay');
const registerOverlay = document.getElementById('register-overlay');

// Get buttons to open modals
const loginBtn = document.getElementById('loginBtn');  // Ensure there's a login button with this ID
const registerBtn = document.getElementById('registerBtn');  // Ensure there's a register button with this ID

// Open modals
loginBtn.onclick = () => loginOverlay.style.display = 'block';
registerBtn.onclick = () => registerOverlay.style.display = 'block';

// Close modals by clicking anywhere outside the box
window.onclick = function(event) {
  if (event.target == loginOverlay) loginOverlay.style.display = 'none';
  if (event.target == registerOverlay) registerOverlay.style.display = 'none';
}
