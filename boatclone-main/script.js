let cart = JSON.parse(localStorage.getItem('cart')) || [];

function openCartPage() {
    window.location.href = "cart.html"; // Navigate to cart page
}

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart)); // Store cart in localStorage
    updateCartCalculation();
}

function removeFromCart(productIndex) {
    // Remove product from cart
    cart.splice(productIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in localStorage
    displayCart(); // Re-render the cart
    updateCartCalculation();
}

function updateCartCalculation() {
    let total = 0;
    cart.forEach(item => {
        total += item.price;
    });
    alert('Total Cart Value: ₹' + total);
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountContainer = document.getElementById('total-amount');
    cartItemsContainer.innerHTML = ""; // Clear previous content
    let total = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('card', 'mb-2');
        itemElement.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">Price: ₹${item.price}</p>
                <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });

    totalAmountContainer.innerText = total;
}

// If the page is the cart page, display the cart items
if (window.location.pathname.includes("cart.html")) {
    window.onload = displayCart;
}
