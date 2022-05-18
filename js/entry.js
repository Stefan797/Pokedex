/**
 * Generates the html code for the single pokémon entry.
 * 
 *  @param  {number} id - Current pokémon id.
 *  @returns {HTMLDivElement}
 */
function generateHTMLForSingleEntry(pokemon) {
    let pokédexentry = document.getElementById('pokédex-entry'); // ${pokemon['types'][0]['type']['name']}-bgColor
    pokédexentry.innerHTML += `
    <div onclick="closeEntry();" class="entry-box">
        <div class="background_container">
        <video loop autoplay src="smaller_resolutions/${pokemon['types'][0]['type']['name']}.mp4">
        </video>
        </div>

        <div class="entry_right_side elements-center">
            <div class="entry_right_side_box elements-column">
                <div class="namecontainer borders_entry">
                    <h2>${upperCaseFirstLetter(pokemon['name'])}</h2>
                </div>
                <div class="imagecontainer borders_entry elements-center">
                    <img src="${pokemon['sprites']['other']['dream_world']['front_default']}">
                </div>
                <div class="idcontainer borders_entry">
                   <p>#00${pokemon['id']}</p>
                </div>
            </div>
        </div>

        <div class="entry_left_side elements-center">
            <div class="entry_left_side_box elements-column">
            </div>
        </div>

    </div>
    `;
}

/**
 * Handed down the html part for the Pokemon abilities.
 * @param {any} pokemon values from the Generations Array
 * @returns html Content
 */
function templatepokémonabilities(pokemon) {
    let htmlCode = '';
    for (let index = 0; index < pokemon['abilities'].length; index++) {
        htmlCode +=
        `
        <tr><td>${upperCaseFirstLetter(pokemon['abilities'][index]['ability']['name'])}</td></tr>
        `;
    }
    return htmlCode;
}