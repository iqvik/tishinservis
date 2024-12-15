const orderList = document.getElementById('order-list');

const cart = JSON.parse(localStorage.getItem('cart')) || [];

cart.forEach(item => {
    const orderItem = document.createElement('div');
    orderItem.classList.add('order-item');
    orderItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <p>${item.name}</p>
        <p>Quantity: ${item.quantity}</p>
    `;
    orderList.appendChild(orderItem);
});