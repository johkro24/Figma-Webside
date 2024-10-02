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

// Shopping Cart Implementation

// Retrieve cart from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to the cart
function addToCart(item) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} ble lagt til i handlekurven`);
    updateCart();
}

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemRow = document.createElement('div');
        itemRow.classList.add('cart-item');
        
        itemRow.innerHTML = `
            <span>${item.name} - ${item.price} kr</span>
            <button onclick="removeFromCart(${index})">Fjern</button>
        `;
        
        cartItemsContainer.appendChild(itemRow);
        total += item.price;
    });
    
    cartTotalContainer.textContent = `${total} kr`;
}

// Function to remove items from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Event listener for Buy buttons
const buyButtons = document.querySelectorAll('.buy-btn');
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-name');
        const itemPrice = parseFloat(button.getAttribute('data-price'));
        
        const item = { name: itemName, price: itemPrice };
        addToCart(item);
    });
});

// Initial update for cart on page load
updateCart();
