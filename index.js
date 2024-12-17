let quantosburgeros;
function addToCart(name, image, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.name === name);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
        quantosburgeros = cart[existingItemIndex].quantity;
    } else {
        cart.push({ name, image, price, quantity: 1 });
        quantosburgeros = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateButtonDisplay(name);
}

function removeFromCart(name, event) {
    event.stopPropagation(); // Prevent triggering add to cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.name === name);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity -= 1;
        if (cart[existingItemIndex].quantity <= 0) {
            cart.splice(existingItemIndex, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateButtonDisplay(name);
    }
}

function changeText(button) {
    const name = button.getAttribute('data-name');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.name === name);
    
    if (item) {
        button.innerHTML = `Added to cart (${item.quantity}) <i class="fa fa-trash" onclick="removeFromCart('${name}', event)"></i>`;
    }
}

function updateButtonDisplay(name) {
    const button = document.querySelector(`button[data-name="${name}"]`);
    if (!button) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.name === name);

    if (item && item.quantity > 0) {
        button.innerHTML = `
            <span class="button-content">
                Added to cart (${item.quantity})
                <i class="fa fa-trash" onclick="removeFromCart('${name}', event)"></i>
            </span>`;
    } else {
        button.innerHTML = 'Add to Cart';
    }
}

window.onload = function() {
    const buttons = document.querySelectorAll('button[data-name]');
    buttons.forEach(button => {
        const itemName = button.getAttribute('data-name');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cart.find(item => item.name === itemName);
       
        if (item) {
            button.innerHTML = `Added to cart (${item.quantity}) <i class="fa fa-trash" onclick="removeFromCart('${itemName}', event)"></i>`;
        }
        
        button.addEventListener('click', function() {
            changeText(button);
        });
    });
};