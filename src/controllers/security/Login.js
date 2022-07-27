"use strict";

/**
 * controller security - login
 * 
 * @author : Francois Macko
 */
class Login {

    constructor () {

    }

    /**
     * génère la réponse renvoyée au navigateur
     * 
     * @param {*} req : object - requête reçue du navigateur
     * @param {*} res : object - réponse envoyée au navigateur
     */
    response(req, res) {


        res.writeHead(200).end('Salut tout le monde');
    } 
}

module.exports.Login = Login;