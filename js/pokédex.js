/**
 * Passes the array of the selected generation with into the function binds the inner html to a div. Calls the function that generates the html part.
 * @param {Array} array 
 */
function showPokedexGeneration(array) {
    let pokédexContent = document.getElementById('pokédex-entries');
    pokédexContent.innerHTML = '';
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        // console.log(element);
        generateHTMLForPokédex(element);
    }
}

/**
 * Created the html part.
 * @param {any} pokemon Values from the Generations Array
 */
function generateHTMLForPokédex(pokemon) {
    let pokédexContent = document.getElementById('pokédex-entries');
    pokédexContent.innerHTML += `<div id="entries-boxes${pokemon.id}" onclick="openEntry(${pokemon.id});" class="${pokemon['types'][0]['type']['name']}-bgColor entries-boxes">
    <div <p id="pokédex-name" class="pokemon-name">${upperCaseFirstLetter(pokemon['name'])}</p></div>
    <div id="pokédex-type-btn-slots${pokemon.id}" class="pokédex-type-box">
        ${templatepokémontypbuttons(pokemon)}
    </div>
    <div id="pokédex-image-box" class="pokédex-image-box">
    <img src="${pokemon['sprites']['other']['dream_world']['front_default']}">
    </div>
    </div>`;
}

/**
 * Handed down the html part for the Pokemon type buttons.
 * @param {any} pokemon Values from the Generations Array
 * @returns html Content
 */
function templatepokémontypbuttons(pokemon) {
    let htmlCode = '';
    for (let index = 0; index < pokemon['types'].length; index++) {
        htmlCode += 
        `
        <button class="${pokemon['types'][index]['type']['name']}-btn type-btn">${upperCaseFirstLetter(pokemon['types'][index]['type']['name'])}</button>
        `;
    }
    return htmlCode;
}

/**
 * Find the pokemon with the correct pokemon id from the general array and add classes so that the html elements get the correct z-index.
 * @param {any} pokemonId 
 */
function openEntry(pokemonId) {
    const pokemon = allPokémons.find(p => p.id == pokemonId);
    let pokédexentry = document.getElementById('pokédex-entry');
    generateHTMLForSingleEntry(pokemon);
    pokédexentry.classList.remove('d-none');
    pokédexentry.classList.remove('z-index-minus');
    pokédexentry.classList.add('z-index-plus');
}

/**
 * Closes the window with datailes information about a special pokémon.
 */
function closeEntry() {
    let pokédexentry = document.getElementById('pokédex-entry');
    pokédexentry.classList.remove('z-index-plus');
    pokédexentry.classList.add('z-index-minus');
    pokédexentry.classList.add('d-none');
    pokédexentry.innerHTML = '';
}