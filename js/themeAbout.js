/**
 * Returns HTML content about Theme container.
 * @returns - about theme container
 */
function returnThemeMoves() {
    return `
    <div id="movesTheme" class="movesTheme padding-five-percent d-none"></div>
    `;
}

/**
 * Generates About content.
 * @param {object} entrypokemon - Selected Pokémon Objects
 */
function generateHtmlAbout(entrypokemon) {
    let themeAbout = document.getElementById('aboutTheme');
    themeAbout.classList.remove('d-none');
    themeAbout.innerHTML = '';
    themeAbout.innerHTML += `
    <div>
        <div class="weight-container">
            <div id="weight">Gewicht :</div>
            <div>${entrypokemon['weight']} kg</div>
        </div>
        <div class="height-container">
            <div id="height">Größe : </div>
            <div>${entrypokemon['height']}0 cm</div>
        </div>
        <div id="ability" class="mb-8" >Fähigkeiten : </div>
        <div class="ability-container scrollbar-design firefox-scrollbar">
            <div id="ability-name"></div>
        </div>
    </div>
    `;
    generateAbilitiesHTML(entrypokemon);
}

/**
 * Loads the data for abilities.
 * @param {object} entrypokemon - Selected Pokémon Objects
 * @returns - HTML content abilities
 */
async function generateAbilitiesHTML(entrypokemon) {
    let content = "";
    for (let i = 0; i < entrypokemon['abilities'].length; i++) {
        let currentAbility = await loadAbilityJSON(entrypokemon, i);
        let test = document.getElementById('ability-name');
        test.innerHTML += `${selectAbilityLanguage(entrypokemon, i, currentAbility)}`;
        content = test;
    }
    return content;
}

/**
 * Selects data according to the current language.
 * @param {object} entrypokemon - Selected Pokémon Objects
 * @param {index} i - Number of Pokémon abilities iterated Length
 * @param {object} currentAbility - object of the ability iterated byDict
 * @returns  HTML content abilities
 */
function selectAbilityLanguage(entrypokemon, i, currentAbility) {
    if (currentLanguage == 'German') {
        let correctTextnumber = checkflavortext(currentAbility);
        return `
        <div class="mb-8">
            ${ABILITIES_CACHE[currentAbility['id']]['names'][4]['name']}
            <div class="mt-8">${ABILITIES_CACHE[currentAbility['id']]['flavor_text_entries'][correctTextnumber]['flavor_text']}</div>
        </div>`;
    }
    if (currentLanguage == 'English') {
        return `
        <div class="mb-8">
            ${entrypokemon['abilities'][i]['ability']['name']}
            <div class="mt-8">${ABILITIES_CACHE[currentAbility['id']]['flavor_text_entries'][0]['flavor_text']}</div>
        </div>`;
    }
}

/**
 * checks the abilities text according to the German sentence 
 * @param {object} currentAbility - object of the ability iterated byDict
 * @returns - Position for German text
 */
function checkflavortext(currentAbility) {
    for (let index = 1; index < currentAbility['flavor_text_entries'].length; index++) {
        // const element = array[index];
        if(currentAbility['flavor_text_entries'][index]['language']['name'] == 'de') {
            return index;
        }
    }
}