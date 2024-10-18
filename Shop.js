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
    try {
        const response = await fetch("http://localhost:5000/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Get error details
            console.error('Failed to add item:', errorData);
            throw new Error(errorData.message || 'Unknown error'); // Handle errors
        }

        displayCart(); // Display updated cart items
    } catch (error) {
        console.error('Error during the fetch operation:', error);
    }
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

// Function to load cart from MongoDB
async function loadCartFromMongoDB() {
    try {
        const response = await fetch("http://localhost:5000/cart");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const dbCart = await response.json();
        console.log('dbCart:', dbCart); // Log the response

        // Check if dbCart is an array
        if (!Array.isArray(dbCart)) {
            console.error('Expected dbCart to be an array, but got:', dbCart);
            return; // Exit if dbCart is not an array
        }

        dbCart.forEach((item) => {
            cart.push(item);
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    } catch (error) {
        console.error('Failed to load cart from MongoDB:', error);
    }
}

// Load cart from MongoDB on page load
loadCartFromMongoDB();
