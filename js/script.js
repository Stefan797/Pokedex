let pokemonDict = {};
let pokemonSpeciesDict = {};
let pokemonTypesDict = {};
let ATTACK_CACHE = {}; // CACHE for Entry Moves
let ABILITIES_CACHE = {}; // CACHE for Entry Abilities
let headerpokemonArray = [];
let currentShowedPokedex = 1;
let currentloading = false;
let currentLanguage = 'German';
let OpenEntry = false;
let currentOpenEntryNumber = 1;

// loadPokemonsSpieces  bei load Function Zwei falsch

/**
 * Calls all functions that are to be loaded when the page is started.
 */
async function init() {
    await loadingStartdatas();
    renderPokemonGeneration(1, 151, 1);
    await headerpokemon();
    await headerpokemonsmartphone();
    showdifferentUserInformations();
}

/**
 * Loading Start Datas from the Api and shows the animation by start.
 */
async function loadingStartdatas() {
    currentloading = true;
    checkDataLoadingAnimation();
    await loadPokemons(10, 0);
    await loadPokemonsSpieces(10, 0);
    await loadPokemonsTypes(18, 0);
    currentloading = false;
    checkDataLoadingAnimation();
}

/**
 * Fills the pokemonDict with values in the form of Jsons and links them together by Pokémon ID.
 * @param {number} amountofnewloadedPokemons - Number of new Pokémon to be loaded
 * @param {number} start - Start value
 */
async function loadPokemons(amountofnewloadedPokemons, start) {
    let pokemonapiurl = `https://pokeapi.co/api/v2/pokemon?limit=${amountofnewloadedPokemons}&offset=${start}`;
    let response = await fetch(pokemonapiurl);
    let responseasJson = await response.json();

    for (let index = 0; index < responseasJson.results.length; index++) {
        const element = responseasJson.results[index];
        const pokemon = await getPokemonByUrl(element.url);
        pokemonDict[pokemon['id']] = pokemon;
    }
}

/**
 * Fills the pokemonSpeciesDict with values in the form of Jsons and links them together by Pokémon ID.
 * @param {number} amountofnewloadedPokemons - Number of new PokémonSpecies to be loaded
 * @param {number} start - Start value
 */
async function loadPokemonsSpieces(amountofnewloadedPokemons, start) {
    let pokemonapiurl = `https://pokeapi.co/api/v2/pokemon-species?limit=${amountofnewloadedPokemons}&offset=${start}`;
    let response = await fetch(pokemonapiurl);
    let responseasJson = await response.json();

    for (let index = 0; index < responseasJson.results.length; index++) {
        const element = responseasJson.results[index];
        const pokemon = await getPokemonByUrl(element.url);
        pokemonSpeciesDict[pokemon['id']] = pokemon;
        // console.log(pokemon['id']); Nicht löschen Anzahl der PKM
    }
}

/**
 * Fills the pokemonTypesDict with values in the form of Jsons.
 * @param {number} amountofnewloadedPokemons - Number of new PokémonTypes to be loaded
 * @param {number} start - Start value
 */
async function loadPokemonsTypes(amountofnewloadedPokemons, start) {
    let pokemonapiurl = `https://pokeapi.co/api/v2/type?limit=${amountofnewloadedPokemons}&offset=${start}`;
    let response = await fetch(pokemonapiurl);
    let responseasJson = await response.json();

    for (let index = 0; index < responseasJson.results.length; index++) {
        const element = responseasJson.results[index];
        const pokemon = await getPokemonByUrl(element.url);
        pokemonTypesDict[pokemon['id']] = pokemon;
        // console.log(pokemonTypesDict[pokemon['id']]);
    }
}

/**
 * Intercepts a link from the Pokémon JSON. Processes the digits after the last backslash, checks if the attack JSON is present or reloads it.
 * @param {object} entrypokemon - Pokémon JSON for the opened entry
 * @param {index} i - the number of values found by the loop
 * @returns - ATTACK_CACHE[respAsJson['id']]
 */
async function loadAttackJSON(entrypokemon, i) {
    let url = entrypokemon['moves'][i]['move']['url'];
    let urlwithoutlastbackslash = url.substring(0, url.lastIndexOf("/"));
    let linknumber = urlwithoutlastbackslash.substring(urlwithoutlastbackslash.lastIndexOf("/") + 1, urlwithoutlastbackslash.length);
    // 1. Case - Cached
    // Return from the Cache
    if (ATTACK_CACHE[linknumber]) {
        return ATTACK_CACHE[linknumber];
    }
    // 2. Case - Not in Cache - Load from Server
    let resp = await fetch(url);
    let respAsJson = await resp.json();
    ATTACK_CACHE[respAsJson['id']] = respAsJson;
    return ATTACK_CACHE[respAsJson['id']];
}

/**
 * Intercepts a link from the Pokémon JSON. Processes the digits after the last backslash, checks if the abilities JSON is present or reloads it.
 * @param {object} entrypokemon - Pokémon JSON for the opened entry
 * @param {index} i - the number of values found by the loop
 * @returns - ABILITIES_CACHE[respAsJson['id']]
 */
async function loadAbilityJSON(entrypokemon, i) {
    let url = entrypokemon['abilities'][i]['ability']['url'];
    let urlwithoutlastbackslash = url.substring(0, url.lastIndexOf("/"));
    let linknumber = urlwithoutlastbackslash.substring(urlwithoutlastbackslash.lastIndexOf("/") + 1, urlwithoutlastbackslash.length);
    // 1. Case - Cached
    // Return from the Cache
    if (ABILITIES_CACHE[linknumber]) {
        return ABILITIES_CACHE[linknumber];
    }
    // 2. Case - Not in Cache - Load from Server
    let resp = await fetch(url);
    let respAsJson = await resp.json();
    ABILITIES_CACHE[respAsJson['id']] = respAsJson;
    return ABILITIES_CACHE[respAsJson['id']];
}

/**
 * Executes the Fetch command and converts to JSON in response.
 * @param {string} onlypokemonurl - Link to the url from the results of the Pokemon Api.
 * @returns - responseasJson
 */
async function getPokemonByUrl(onlypokemonurl) {
    let response = await fetch(onlypokemonurl);
    let responseasJson = await response.json();
    return responseasJson;
}

/**
 * Called to load the generations, checks if the data of the first Pokémon of the respective generation already exists, then calls the function to display the Pokémon generation.
 * @param {number} start - Start value of the first Pokemon of the generation 
 * @param {number} stop - Stop value of the last Pokemon of the generation
 * @param {number} generationNumber - Pokemon Generation Number
 */
async function loadPokemonGeneration(start, stop, generationNumber) {
    window.scrollTo(0, 0);
    switch (generationNumber) {
        case 1:
            if (!pokemonDict[152]) {
                currentloading = true;
                checkDataLoadingAnimation();
                await loadPokemons(20, 1);
                await loadPokemonsSpieces(20, 1);
                currentloading = false;
                checkDataLoadingAnimation();
            }
            break;
        case 2:
            if (!pokemonDict[152]) {
                currentloading = true;
                checkDataLoadingAnimation();
                await loadPokemons(20, 151);
                await loadPokemonsSpieces(20, 151);
                currentloading = false;
                checkDataLoadingAnimation();
            }
            break;
        case 3:
            if (!pokemonDict[252]) {
                currentloading = true;
                checkDataLoadingAnimation();
                await loadPokemons(20, 251);
                await loadPokemonsSpieces(20, 251);
                currentloading = false;
                checkDataLoadingAnimation();
            }

            break;
    }

    renderPokemonGeneration(start, stop, generationNumber);
}