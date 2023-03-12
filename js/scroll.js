/**
 * Checks if the page is scrolled to the bottom of the page.
 * @param {object} ev - The browser API event.
 */
window.onscroll = async function (ev) {
    // debugger;
    if (hasReachedPageBottom() && !currentloading && checkGenerationLoadingEndpoint()) {
        currentloading = true;
        checkDataLoadingAnimation();
        await nextsteps();
        currentloading = false;
        checkDataLoadingAnimation();
    }
};

/**
 * Search for the next non-existent Pokémon
 */
async function nextsteps() {
    let nextPokemonId = await findNextMissingPokemon(checkfindNextMissingPokemonStartValue());
    if (nextPokemonId != null) {
        await initializeFoundPokemon(nextPokemonId);
    }
}

/**
 * Blocks new loading as soon as the last Pokémon of the generation are loaded.
 * @returns - true
 */
function checkGenerationLoadingEndpoint() {
    switch (currentShowedPokedex) {
        case 1:
            if (!pokemonDict[151]) {
                return true;
            }
            break;
        case 2:
            if (!pokemonDict[251]) {
                return true;
            }
            break;
        case 3:
            if (!pokemonDict[387]) {
                return true;
            }
            break;
    }
}

/**
 * Calculates whether the scroll is at the bottom of the page.
 * @returns - true
 */
function hasReachedPageBottom() {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
}

/**
 * Specifies the direction from which the start value is to be searched for depending on the current generation.
 * @returns - number of Start value for the generation
 */
function checkfindNextMissingPokemonStartValue() {
    if (currentShowedPokedex == 1) {
        return 1;
    }
    if (currentShowedPokedex == 2) {
        return 152;
    }
    if (currentShowedPokedex == 3) {
        return 252;
    }

}

/**
 * Searches with a starting value for the next non-existent Pokémon counted upwards.
 * @param {number} start - Start value
 * @returns - found number
 */
async function findNextMissingPokemon(start) {
    if (start <= 387) {
        for (let i = start; i < 387; i++) {
            if (pokemonDict[i]) {
                continue;
            } else {
                return i;
            }
        }
    } else {
        return null;
    }
}

/**
 * Calls the next two load functions.
 * @param {number} nextPokemonId - ID of next Pokemon 
 */
async function initializeFoundPokemon(nextPokemonId) {
    // debugger;
    let newStartValue = nextPokemonId - 1;
    await loadPokemons(10, newStartValue);
    await loadPokemonsSpieces(10, newStartValue);
    renderCurrentGeneration(nextPokemonId);
}

/**
 * Restores the currently displayed Pokémon generation by using the render function to reload the HTML content.
 */
function renderCurrentGeneration() {
    if (currentShowedPokedex == 1) {
        renderPokemonGeneration(1, 151, 1);
    }
    if (currentShowedPokedex == 2) {
        renderPokemonGeneration(152, 251, 2);
    }
    if (currentShowedPokedex == 3) {
        renderPokemonGeneration(252, 387, 3);
    }
}