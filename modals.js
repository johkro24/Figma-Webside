// Get overlay elements
const loginOverlay = document.getElementById("login-overlay");
const registerOverlay = document.getElementById("register-overlay");

// Get buttons to open overlay
const loginBtn = document.getElementById("loginBtn"); // Ensure there's a login button with this ID
const registerBtn = document.getElementById("registerBtn"); // Ensure there's a register button with this ID

// Open overlay
loginBtn.onclick = () => (loginOverlay.style.display = "block");
registerBtn.onclick = () => (registerOverlay.style.display = "block");

// Close overlay by clicking anywhere outside the box
window.onclick = function (event) {
  if (event.target == loginOverlay) loginOverlay.style.display = "none";
  if (event.target == registerOverlay) registerOverlay.style.display = "none";
};
