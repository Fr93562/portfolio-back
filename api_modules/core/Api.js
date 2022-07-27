"use strict";

let http = require('http');
let cors = require('../securities/cors');
let send = require('../services/send');
let bodyParser = require('../services/bodyParser');

/**
 * @author: Fr93562
 * @description: Stocke le serveur dans la variable de classe server
 * Au démarrage, on stocke le serveur dans la variable de classe server
 * A l'arrêt, on vide la variable de classe server
 */
class Api {
    server='';

    /**
     * Démarre le serveur
     * Assigne le serveur crée à la variable de classe server
     *
     * @public
     * @param {integer} port: port utilisé par l'api
     * @param {function} router
     */
    async start(port, router, domains) {

        this.server =  http.createServer(function (req, res) {

            res.send = send;

            let domainAccepted = cors.verify(req, domains, port);

            if (domainAccepted) {
                bodyParser(req, (data) => {
                    req.body = data;
                    router(req, res);
                });
            } else {
                cors.blocked(res);
            }
        });

        this.server.listen(port);
    }

    /**
     * Stop le serveur
     * Vide la variable de classe server
     * 
     * @private
     */
    stop() {

        if (this.server) {
            this.server=''; 
        }
    }
}

module.exports = new Api;