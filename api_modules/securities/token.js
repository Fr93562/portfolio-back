let hash = require('./hash');
let logs = require('../services/logs');

/**
 * Encore le token JWT
 * @param {string} secret 
 * @param {any} content 
 * @returns 
 */
function encode(secret, content) {

    let primaryToken = { header : { "typ": "JWT" }, body : content, signature: hash.create(secret) };
    let stringedToken = JSON. stringify(primaryToken);
    let encodedToken = Buffer.from(stringedToken).toString('base64' );

    return encodedToken;
}

/**
 * Décode le token JWT 
 * @param {string} encodedToken 
 * @returns 
 */
function decode(encodedToken) {
    let stringedToken = Buffer.from(encodedToken, 'base64').toString('utf-8');
    let decodedToken = JSON.parse(stringedToken);

    return decodedToken;
}

/**
 * Décode puis vérifie le token
 * @param {string} secret 
 * @param {string} encodedToken 
 * @returns 
 */
function verify(secret, encodedToken) {
    let response = false;

    try {
        let decodeToken = decode(encodedToken);
        let hashSecret = hash.create(secret);

        if (hashSecret === decodeToken.signature) {
            response = true;
            logs.message(`verify - success`);
        }

    } catch (error) {
        logs.error(`verify - error with token: "${encodedToken}"`)
    }
    return response;
}

let security = {
    encode: encode,
    decode: decode,
    verify: verify,
};

module.exports = security;