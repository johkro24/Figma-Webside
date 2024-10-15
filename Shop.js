let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add items to cart and MongoDB
async function addToCart(itemID, itemName, price) {
  const item = {
    id: itemID,
    name: itemName,
    price: parseFloat(price), // Ensure the price is parsed as a float
    quantity: 1, // Default quantity
  };

  // Save the item to local storage for local cart tracking
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));

  // Send the item to the MongoDB server (backend API)
  await fetch("http://localhost:5000/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  displayCart(); // Display updated cart items
}

// Function to display cart items locally
function displayCart() {
  const cartDisplay = document.getElementById("cart");
  if (!cartDisplay) {
    console.error("Cart display element not found.");
    return;
  }
  cartDisplay.innerHTML = "";
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.innerHTML = `<strong>Item:</strong> ${item.name} <br><strong>Price:</strong> ${item.price}kr <br><strong>ID:</strong> ${item.id}`;
    cartDisplay.appendChild(cartItem);
  });
}

// Function to load cart from MongoDB (you need to implement the backend for this)
async function loadCartFromMongoDB() {
  const response = await fetch("http://localhost:5000/cart");
  const dbCart = await response.json();

  dbCart.forEach((item) => {
    cart.push(item);
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Load cart from MongoDB on page load
loadCartFromMongoDB();
