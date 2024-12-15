
function addToCart(name, image, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.name === name);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ name, image, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function changeText(button) {
    button.innerText = "Добавлено в корзину"
    setTimeout(() => {
        button.innerText = "Добавить в корзину";
    }, 1250);
    
}