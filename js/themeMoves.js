/**
 * Returns HTML content moves Theme container.
 * @returns - moves theme container
 */
function returnThemeAbout() {
    return `
    <div id="aboutTheme" class="aboutTheme padding-five-percent"></div>
    `;
}

/**
 * Generates moves content.
 * @param {object} entrypokemon - Selected Pokémon Objects
 */
function generateHtmlMoves(entrypokemon) {
    let themeMoves = document.getElementById('movesTheme');
    themeMoves.classList.remove('d-none');
    themeMoves.innerHTML = '';
    themeMoves.innerHTML += /*html*/ `
        <div class="maincontainer">
            <div class="headlines">
                <div style="width: 30%;">Level</div>
                <div style="width: 70%;">Attacken</div>
            </div>
            <div class="headlinecontent scrollbar-design firefox-scrollbar">
                <div style="width: 30%; max-height: 100%;" id="levels"></div>
                <div style="width: 70%; max-height: 100%;" id="moves"></div>
            </div>
        </div>
    `;
    getLearndLevelAtNumbersHtml(entrypokemon);
    getLearndLevelAtMovesHtml(entrypokemon);
}

/**
 * Generates moves numbers datas by level up.
 * @param {object} entrypokemon - Selected Pokémon Objects
 */
function getLearndLevelAtNumbersHtml(entrypokemon) {
    let movesOrdered = ascendingNumbers(entrypokemon);
    for (let i = 0; i < movesOrdered.length; i++) {
        if (movesOrdered[i]['version_group_details'][0]['move_learn_method']['name'] == 'level-up') {
            let levelup = document.getElementById('levels');
            levelup.innerHTML += `
            <div class="mb_2px">${movesOrdered[i]['version_group_details'][0]['level_learned_at']}</div>
            `;
        }
    }
}

/**
 * Generates moves datas by level up.
 * @param {object} entrypokemon - Selected Pokémon Objects
 */
async function getLearndLevelAtMovesHtml(entrypokemon) {
    let movesOrdered = ascendingNumbers(entrypokemon);
    // debugger;
    for (let i = 0; i < movesOrdered.length; i++) {
        if (movesOrdered[i]['version_group_details'][0]['move_learn_method']['name'] == 'level-up') { // machine level-up
            let currentMove = await loadAttackJSON(entrypokemon, i);
            let movesbylevelup = document.getElementById('moves');
            movesbylevelup.innerHTML += `
            <div class="mb_2px">${selectAttackLanguage(entrypokemon, i, currentMove)}</div>
            `;
        }
    }
}

/**
 * Selects data according to the current language.
 * @param {object} entrypokemon - Selected Pokémon Objects
 * @param {number} i - Number of Pokémon moves iterated Length
 * @param {object} currentMove - object of the individual moves iterated byDict
 * @returns - Pokémon moves names
 */
function selectAttackLanguage(entrypokemon, i, currentMove) {
    if (currentLanguage == 'German') {
        return `${ATTACK_CACHE[currentMove['id']]['names'][4]['name']}`;
    }
    if (currentLanguage == 'English') {
        return `${entrypokemon['moves'][i]['move']['name']}`;
    }
}

/**
 * sorts the places from the field ['moves'] from small to large.
 * @param {object} entrypokemon - Selected Pokémon Objects
 * @returns - numbers from zero ascending
 */
function ascendingNumbers(entrypokemon) {
    let movesOrdered = entrypokemon['moves'].sort(function (m1, m2) {
        return m1['version_group_details'][0]['level_learned_at'] - m2['version_group_details'][0]['level_learned_at'];
    });
    return movesOrdered;
}