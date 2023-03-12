/**
 * Returns HTML content basestats Theme container.
 * @returns basestats Theme container
 */
function returnThemeBaseStats() {
    return /*html*/ `
    <div class="basestatsTheme">
        <div id="basestatsTheme" class="main-container-baseStats scrollbar-design firefox-scrollbar padding-five-percent d-none"></div>
    </div>
    `;
}

/**
 * Generates basestats content.
 * @param {object} entrypokemon - Selected Pokémon Objects
 */
function generateHtmlBaseStats(entrypokemon) {
    let themeBaseStats = document.getElementById('basestatsTheme');
    themeBaseStats.classList.remove('d-none');
    themeBaseStats.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        themeBaseStats.innerHTML += /*html*/ `
        <div class="basestatsbox mb-8">
            <div style="width: 28%; max-height: 100%;">
                ${upperCaseFirstLetter(entrypokemon['stats'][i]['stat']['name'])}
            </div>
            <div style="width: 68%; max-height: 100%;">
                ${getstatsbars(entrypokemon['stats'][i]['base_stat'], entrypokemon['id'])}
            </div>
        </div>
        `;
    }
}

/**
 * Generates basestats bars content.
 * @param {number} baseStatValue - Value of the base values 
 * @param {number} pokemonID - current Pokémon ID
 * @returns HTML content basestats Bars
 */
function getstatsbars(baseStatValue, pokemonID) {
    if (baseStatValue >= 100) {
        baseStatValue = 100;
    }
    let pokemon = pokemonDict[pokemonID];
    let pokemonType = pokemon['types'][0]['type']['name'];
    let baseStatBar = "";
    baseStatBar = `<div id="progress"><div style="width: ${baseStatValue}%;" class="bar entry-color-${pokemonType}"></div></div>`;
    return baseStatBar;
}