let InformationSentencesGerman = [ 'Klicke auf die jeweilige Karte um den Eintrag anzusehen.', 'Drücke die Tasten L + E um die Pokedex Sprache auf Englisch zu ändern !', 'Klicke auf das Pikachu, um oben zur Seite zu gelangen.'];
let InformationSentencesEnglish = ['Click on the Pikachu to return to the top of the page each time.','Click on the respective maps to view the entry.', 'Press the L + G keys to change the Pokedex language to German !'];
let showHint = 0;
let interval;

/**
 * Downloads the Pikachu and binds the path to the image src.
 */
async function headerpokemon() {
    let pikachu = 'https://pokeapi.co/api/v2/pokemon/25/';
    let pikachuResp = await fetch(pikachu);
    let pikachuResponseAsJson = await pikachuResp.json();
    headerpokemonArray.push(pikachuResponseAsJson);
    let headerpokemon = headerpokemonArray[0];
    let imagepath = headerpokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById('headerpokemon').src = imagepath;
    document.getElementById('headerpokemon').classList.remove('d-none');
}

/**
 * Downloads the Pikachu and binds the path to the image src by smartphone version.
 */
async function headerpokemonsmartphone() {
    let pikachu = 'https://pokeapi.co/api/v2/pokemon/25/';
    let pikachuResp = await fetch(pikachu);
    let pikachuResponseAsJson = await pikachuResp.json();
    headerpokemonArray.push(pikachuResponseAsJson);
    let headerpokemon = headerpokemonArray[0];
    let imagepath = headerpokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById('headerpokemon-smartphone').src = imagepath;
    document.getElementById('headerpokemon-smartphone').classList.remove('d-none');
}

/**
 * The window event scrolls up to the page.
 */
function comeUpToSide() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
}

/**
 * Calls an interval with the function for different user informations.
 */
function showdifferentUserInformations() {
    interval = setInterval(() => {
        changeInformationSentence();
    }, 3000);
}

/**
 * Goes through the number of information sets.
 */
function changeInformationSentence() {
    // debugger;
    let info = document.getElementById('info-text');
    const Sentence = InformationSentencesGerman[showHint];
    info.innerHTML = Sentence;    
    showHint++;
    if(showHint == 4) {
        info.classList.add('d-none');
        document.getElementById('info-animation').classList.add('d-none');
        clearInterval(interval);
        // setTimeout(() => {
        //     showdifferentUserInformations();
        // }, 5000);
    }
}

/**
 * Recalls render functions to load the values that can be changed in them into another language.
 */
function changePokedexLanguage() {
    if (OpenEntry) {
        opensingleEntry(currentOpenEntryNumber);
        changeEntryMenuLanguage();
        setTimeout(() => {
            changeEntryThemeLanguageAbout();
        }, 1000);
    } 
    renderCurrentGeneration();
}

/**
 * Changes the language on the About topic.
 */
function changeEntryThemeLanguageAbout() {
    if (currentLanguage == 'English') {
        document.getElementById("weight").innerHTML  = 'Weight :';
        document.getElementById('height').innerHTML = 'Height :';
        document.getElementById('ability').innerHTML = 'Ability :';
    } 
    if (currentLanguage == 'German') {
        document.getElementById('weight').innerHTML = 'Gewicht :';
        document.getElementById('height').innerHTML = 'Größe :';
        document.getElementById('ability').innerHTML = 'Fähigkeit :';
    }
}

/**
 * Changes the language for the selectable menus in the Pokemon entry.
 */
function changeEntryMenuLanguage() {
    if (currentLanguage == 'English') {
        document.getElementById('entry-about-menu').innerHTML = 'About';
        document.getElementById('entry-base-stats-menu').innerHTML = 'Base Stats';
        document.getElementById('entry-moves-menu').innerHTML = 'Moves';
    }
    if (currentLanguage == 'German') {
        document.getElementById('entry-about-menu').innerHTML = 'Über';
        document.getElementById('entry-base-stats-menu').innerHTML = 'Basis Werte';
        document.getElementById('entry-moves-menu').innerHTML = 'Attacken';
    }
}

/**
 * Showes a loading animation as long as the variable currentloading is true.
 */
function checkDataLoadingAnimation() {
    if (currentloading) {
        document.getElementById('loader').classList.remove('d-none');
    }
    if (!currentloading) {
        document.getElementById('loader').classList.add('d-none');
    }
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