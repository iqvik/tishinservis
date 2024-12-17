function storeLanguage(selectElement) {
    const language = selectElement.value;
    localStorage.setItem('language', language);
    
    if (language === 'en') {
        window.location.href = 'settings-en.html';
    } else if (language === 'ru') {
        window.location.href = 'settings-ru.html';
    }
}

window.onload = function() {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
        const selectElement = document.querySelector('.language-select');
        selectElement.value = storedLanguage;
    }
};

function Mode() {
    var body = document.body;
    var topBar = document.querySelector('.top-bar') || document.querySelector('.top-bar1');
    var languageBox = document.querySelector('.language-box') || document.querySelector('.language-boxe')

    body.classList.toggle("darkmode");

    if (body.classList.contains('darkmode')) {
        topBar.classList.remove('top-bar');
        topBar.classList.add('top-bar1');
        languageBox.classList.remove('language-box');
        languageBox.classList.add('language-box1');
    } else {
        topBar.classList.remove('top-bar1');
        topBar.classList.add('top-bar');
        languageBox.classList.remove('language-box1');
        languageBox.classList.add('language-box');
    }
}
