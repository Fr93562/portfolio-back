"use strict";

/**
 * @author: Fr93562
 */
function help(req, res) {

        const response = {
            message: 'Cette API est un POC.',
            paths: [
                { health: `Indique si l'Api est opérationnelle.` },
                { info: `Donne les informations disponibles au sujet de l'Api` },
                { error: `Réponse en cas d'erreur` },
            ],
        };

        res.send(200, response);
}

module.exports = help;