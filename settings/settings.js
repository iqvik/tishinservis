// Store language preference in localStorage and redirect to the appropriate page
function storeLanguagePreferenceAndRedirect(selectElement) {
    const language = selectElement.value;
    localStorage.setItem('language', language); // Store the language in localStorage
    
    if (language === 'en') {
        window.location.href = 'en.html'; // Redirect to the English page
    } else if (language === 'ru') {
        window.location.href = 'ru.html'; // Redirect to the Russian page
    }
}

// Apply the stored language preference when the page is loaded
window.onload = function() {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
        const selectElement = document.querySelector('.language-select');
        selectElement.value = storedLanguage; // Set the dropdown to the stored language
    }
};
