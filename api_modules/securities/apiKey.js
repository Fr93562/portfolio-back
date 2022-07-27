/**
 * Vérifie si l'APIkey reçue corresponds à celle de l'API
 * @param {string} secret 
 * @param {string} key 
 * @returns : boolean, true si vrai
 */
function verify(secret, key) {
    let response = false;

    if (secret === key) {
        response = true;
    }

    return response;
}

let apiKey = {
    verify: verify,
};

module.exports = apiKey;