/**
 * Returns Html content
 * @param {object} entrypokemon - Selected Pokémon Objects
 * @param {object} entrypokemonSpecies - Selected PokémonSpecies Objects
 * @returns - HTML content
 */
function getHtmlforSingleEntry(entrypokemon, entrypokemonSpecies) {
    const id = entrypokemon['id'];
    const typename = entrypokemon['types'][0]['type']['name'];
    let currentPokemonTypeJson = findPokemonType(entrypokemon);
    setTimeout(() => {
        generateHtmlAbout(entrypokemon);
    }, 1000);
    return `
    <div class="pokemon-container center entry-color-${typename}">
        <span>${selectEntryPokemonNameLanguage(entrypokemon, entrypokemonSpecies)}</span>
        <img src="${entrypokemon['sprites']['other']['dream_world']['front_default']}">
    </div>
    <div class="info_container">
        <div class="idAndTypeCon">
            <p># ${id}</p>
            <button>${selectEntryTypeLanguage(entrypokemon, currentPokemonTypeJson)}</button>
        </div>

        <div class="subjects">
            <div id="entry-about-menu" onclick="showTheme(${id}, 'About')">Über</div>
            <div id="entry-base-stats-menu" onclick="showTheme(${id}, 'BaseStats')">Basis Werte</div>
            <div id="entry-moves-menu" onclick="showTheme(${id}, 'Moves')">Attacken</div>
        </div>
        <div id="theme" class="theme">
            ${returnThemeAbout()}
            ${returnThemeBaseStats()}
            ${returnThemeMoves()}
        </div>
    </div>
    `;
}

/**
 * Compares the German value from the pokemonTypesDict with that from the pokemonDict value.
 * @param {object} entrypokemon - Selected Pokémon Objects
 * @returns - Pokémon type object
 */
function findPokemonType(entrypokemon) {
    let test = pokemonTypesDict;
    for (let x = 1; x <= 18; x++) {
        if (test[x]['name'] == entrypokemon['types'][0]['type']['name']) {
            return pokemonTypesDict[x];
        }
    }
}

/**
 * Selects data according to the current language.
 * @param {object} entrypokemon - Selected Pokémon Objects
 * @param {object} entrypokemonSpecies - Selected PokémonSpecies Objects
 * @returns Pokémon Name data
 */
function selectEntryPokemonNameLanguage(entrypokemon, entrypokemonSpecies) {
    // debugger;
    let pokemonId = entrypokemon['id'];
    if (currentLanguage == 'German') {
        return `${entrypokemonSpecies['names'][5]['name']}`;
    }
    if (currentLanguage == 'English') {
        return `${upperCaseFirstLetter(pokemonDict[pokemonId]['name'])}`;
    }
}

/**
 * Selects data according to the current language.
 * @param {object} entrypokemon - Selected Pokémon Objects
 * @param {object} currentPokemonTypeJson - Found Pokemon Type Object
 * @returns Pokémon Type data
 */
function selectEntryTypeLanguage(entrypokemon, currentPokemonTypeJson) {
    let pokemonId = entrypokemon['id'];
    // debugger;
    if (currentLanguage == 'German') {
        return `${currentPokemonTypeJson['names'][4]['name']}`;
    }
    if (currentLanguage == 'English') {
        return `${upperCaseFirstLetter(pokemonDict[pokemonId]['types'][0]['type']['name'])}`;
    }
}

/**
 * Passes data and selects correct function.
 * @param {number} pokemonID - current Pokémon ID
 * @param {string} selectedtopic - Value given to select the Theme entry
 */
function showTheme(pokemonID, selectedtopic) {
    const entrypokemon = pokemonDict[pokemonID];

    if (selectedtopic == 'About') {
        clearAll();
        generateHtmlAbout(entrypokemon);
    }
    if (selectedtopic == 'BaseStats') {
        clearAll();
        generateHtmlBaseStats(entrypokemon);
    }
    if (selectedtopic == 'Moves') {
        clearAll();
        generateHtmlMoves(entrypokemon);
    }
}

/**
 * All entry themes HTML Container are removed with display: none; 
 */
function clearAll() {
    document.getElementById('aboutTheme').classList.add('d-none');
    document.getElementById('basestatsTheme').classList.add('d-none');
    document.getElementById('movesTheme').classList.add('d-none');
}

/**
 * Makes the HTML container of the entry invisible.
 */
function closesingleEntry() {
    document.getElementById('entry-background-container').classList.add('d-none');
    document.getElementById('singleEntry').classList.add('d-none');
    OpenEntry = false;
}