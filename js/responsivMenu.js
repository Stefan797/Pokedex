/**
 * Makes the HTML container for the header menu visible.
 */
function openmenu() {
    document.getElementById('header-menu').classList.remove('d-none');
}

/**
 * Changes the Pokedex language to English
 */
function changelanguagetoEnglish() {
    currentLanguage = 'English';
    changePokedexLanguage();
}

/**
 * Changes the Pokedex language to German
 */
function changelanguagetoGerman() {
    currentLanguage = 'German';
    changePokedexLanguage();
}

/**
 * Makes the HTML container for the header menu invisible.
 */
function closemenu() {
    document.getElementById('header-menu').classList.add('d-none');
}