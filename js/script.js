const allPokémons = [];

let FirstPokédexGenerationArray = [];
let SecondPokédexGenerationArray = [];
let ThirdPokédexGenerationArray = [];
// 1 - 151
// 152 - 251
// 252 - 386

/**
 * Starts the app and hides the load page when the getallPokemonsfromApi function is complete.
 */
async function init() {
    await getallPokemonsfromApi();
    document.getElementById('loadscreen').classList.add("d-none");
}

/**
 *  Downloads from the Pokemon rest api the individual Pokemon links as json and then the data for each one. This is pushed into a general array.
 *  After that it runs the sorting function and loads the first generation in the html area.
 */
async function getallPokemonsfromApi() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'; // limit= 387 
    let response = await fetch(url);
    let responseasJson = await response.json();
    // console.log('geht', responseasJson);
    for (let index = 0; index < responseasJson.results.length; index++) {
        const element = responseasJson.results[index];
        const pokemon = await getPokemonByUrl(element.url);
        allPokémons.push(pokemon);
    }
    sortbyGeneration();
    console.log(FirstPokédexGenerationArray);
    // console.log(SecondPokédexGenerationArray);
    // console.log(ThirdPokédexGenerationArray);
    showPokedexGeneration(FirstPokédexGenerationArray);
}

/**
 * Loads the individual Pokemon and saves them to the variable responseasJson.
 * @param {any} url Element of each Pokemon links. 
 * @returns The data as Json
 */
async function getPokemonByUrl(url) {
    let response = await fetch(url);
    let responseasJson = await response.json();
    return responseasJson;
}

/**
 * Sorts the Pokemon into three arrays from generation one to three.
 */
function sortbyGeneration() {
    FirstPokédexGenerationArray = allPokémons.filter( p => p.id <= 151);
    SecondPokédexGenerationArray = allPokémons.filter( p => p.id > 151 && p.id <= 251);
    ThirdPokédexGenerationArray = allPokémons.filter( p => p.id > 252 && p.id <= 386);
}

/**
 * Converts the first letter to a capital letter.
 * 
 * @param  {string} string - String to be converted.
 * @returns {string}
 */
function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
