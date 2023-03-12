let keyRegister = {};

/**
 * The window.addEventlistener(with "keydown") registers when keys are pressed. 
 */
window.addEventListener("keydown", (keyboard) => {
    keyRegister[keyboard.key] = true;
});

/**
 * The window.addEventlistener(with "keyup") registers when keys are released.
 */
window.addEventListener("keyup", (keyboard) => {

    if (currentLanguage == 'German') {
        if (keyRegister['e'] && keyRegister['l']) {
            currentLanguage = 'English';
            changePokedexLanguage();
        }
    }

    if (currentLanguage == 'English') {
        if (keyRegister['d'] && keyRegister['l']) {
            currentLanguage = 'German';
            changePokedexLanguage();
        }
    }

    keyRegister[keyboard.key] = false;
});