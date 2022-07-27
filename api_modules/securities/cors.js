let logs = require('../services/logs');

/**
 * Vérifie si la requête est acceptable par le CORS.
 * @param {object} req 
 * @param {array} domains 
 * @param {integer} PORT 
 * @returns 
 */
function verify(req, domains, PORT) {
    let response = false;

    if (domains && !domains.includes('*')) {
        let { protocol, hostname } = req;
        let port = process.env.PORT || PORT;
        let currentDomain = `${protocol}://${hostname}:${port}`;

        for (let i = 0; i < domains.length; i++) {            
            if (currentDomain.includes(domains[i])) {
                response = true;
                break;
            }
        }

    } else {
        response = true;
    }
    return response;
}

/**
 * Renvoie une réponse not allowed by CORS
 * @param {object} res 
 */
function blocked(res) {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Max-Age": 2592000,
      };

    logs.error('Not allowed by CORS.')

    res.writeHead(405, headers);
    res.end(`This request is not allowed.`);
}

let cors = {
    verify: verify,
    blocked: blocked,
};



module.exports = cors;