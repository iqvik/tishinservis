document.addEventListener('DOMContentLoaded', function () {
    var nameInput = document.getElementById('nameInput');
    var roomInput = document.getElementById('roomInput');
    var orderInput = document.getElementById('orderInput');
    var sendButton = document.getElementById('sendButton');
    var messageBox = document.getElementById('messageBox');

    var nameIcon = document.getElementById('nameIcon');
    var roomIcon = document.getElementById('roomIcon');
    var orderIcon = document.getElementById('orderIcon');

    var names = ['Ирина', 'Сергей', 'Тихон', 'Федор'];

    function toggleIcon(input, icon) {
        if (names.includes(input.value.trim())) {
            icon.classList.remove('fa-frown-o');
            icon.classList.add('fa-smile-o');
        } else {
            icon.classList.remove('fa-smile-o');
            icon.classList.add('fa-frown-o');
        }
    }

    nameInput.addEventListener('input', function () {
        toggleIcon(nameInput, nameIcon);
    });

    roomInput.addEventListener('input', function () {
        toggleIcon(roomInput, roomIcon);
    });

    orderInput.addEventListener('input', function () {
        toggleIcon(orderInput, orderIcon);
    });

    sendButton.addEventListener('click', function () {
        var name = nameInput.value.trim();
        var room = roomInput.value.trim();
        var order = orderInput.value.trim();

        if (name && room && order) {
            var foodItem = [
                { id: 1, name: 'Neapolitan Pizza', img: 'pizza-1.png' },
                { id: 2, name: 'Vegetarian Pizza', img: 'pizza-2.png' },
                { id: 3, name: 'California Pizza', img: 'pizza-3.png' },
                { id: 4, name: 'Cheese Pizza', img: 'pizza-4.png' },
                { id: 10, name: 'Bacon Burger', img: 'burger-1.png' },
                { id: 11, name: 'Cheeseburger', img: 'burger-2.png' },
                { id: 12, name: 'Vegetarian Burger', img: 'burger-3.png' },
                { id: 13, name: 'Pastrami Burger', img: 'burger-4.png' },
                { id: 16, name: 'Vegetarian Salad', img: 'salad-1.png' },
                { id: 17, name: 'Fish Louie', img: 'salad-2.png' },
                { id: 18, name: 'Fiambre', img: 'salad-3.png' },
                { id: 19, name: 'Chef Salad', img: 'salad-4.png' },
                { id: 20, name: 'Greek Salad', img: 'salad-6.png' },
                { id: 30, name: 'Cola', img: 'cola.png' },
                { id: 31, name: 'Fries', img: 'fries.png' }
            ];

            var orderItems = order.split('-');
            var orderedImages = orderItems.map(itemId => {
                var item = foodItem.find(food => food.id == itemId);
                return item ? item.img : null;
            }).filter(img => img !== null);

            var message = `Вы получили новый заказ (${orderedImages.join(', ')}). Заказ нужно доставить в ${room}. Заказали: ${name}`;

            fetch(`https://api.telegram.org/bot7246703502:AAHKg-QVxeL0s2Ksp6Lr8c3V3R6MpA1SBwA/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: '7433299603',
                    text: message
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    messageBox.textContent = 'Order sent successfully!';
                    // Send each image as a separate message
                    orderedImages.forEach(img => {
                        fetch(`https://api.telegram.org/bot7246703502:AAHKg-QVxeL0s2Ksp6Lr8c3V3R6MpA1SBwA/sendPhoto`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                chat_id: '6852399576',
                                photo: `C:\Users\anisi\Documents\Vs Code\shoppingsite-main\/${img}`
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (!data.ok) {
                                console.error('Failed to send image:', data.description);
                            }
                        })
                        .catch(error => console.error('Error sending image:', error));
                    });
                } else {
                    messageBox.textContent = 'Failed to send order.';
                }
            })
            .catch(error => {
                console.error('Error sending message:', error);
                messageBox.textContent = 'Failed to send order.';
            });
        } else {
            messageBox.textContent = 'Please fill out all fields.';
        }
    });
});
