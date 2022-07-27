let logs = require('./logs');

/**
 * Gère les routes
 * 
 * A chaque requête, req, res, l'url et les paramètres sont récupérés
 * Elles sont utilisées pour les différentes 
 * 
 * Cette classe possède une action à effectuer si une erreur est produite.
 * Cette classe possède une action si aucune des routes n'est atteinte.
 * 
 * @author: Fr93562
 */
class Route {
    req = {};
    res = {};

    request = {
        header: {
            url: '',
            params: [],
            method: '',
            token: '',
        },
        body: ''
    };

    isSend = false;
    isLogged = false;

    // Getters et setters

    /**
     * Décompose la requête et le stocke dans l'objet 
     * @param {*} req  - object: node
     */
    setRequest(req) {
        this.request.header = {
            url: this.getUrl(req.url),
            params: this.getParams(req.url),
            method: req.method,
            token: req.token,
        };
    }

    /**
     * Passe isSend à true
     * Indique que la requête a eu une réponse
     */
    setIsSend(value) {
        this.isSend = value;
    }

    /**
     * Récupère l'url
     *
     * @param {*} url - string: url à analyser
     * @returns - string: url
     */
    getUrl(url) {
        let response = '';
        let array = url.split('?');

        response = array[0];

        return response;
    }

    /**
     * Récupère les paramètres de l'url
     *
     * @param {*} url - string: url à analyser
     * @returns - array of object
     */
    getParams(url) {
        let response = [];

        if (url.includes('?')) {

            let array = url.split('?');
            let paramsRaw = array[1];
            let paramsArray = paramsRaw.split('&');

            for (let i = 0; i < paramsArray.length; i++) {
                let paramsCurrent = paramsArray[i];
                let paramsCurrentArray = paramsCurrent.split('=');

                response.push(
                    {
                        name: paramsCurrentArray[0],
                        value: paramsCurrentArray[1],
                    }
                );

            }
        }
        return response;
    }

    /**
     * Renvoi la valeur de isSend;
     * @returns - bool: valeur de isSend
     */
    getIsSend() {
        return this.isSend;
    }

    // Logics

    /**
     * Appelle la fonction en cas de correspondance
     * @param {function} action 
     */
    _call(action) {
        if (!this.getIsSend()) {
            action(this.req, this.res);
            this.setIsSend(true);
        }
    }

    /**
     * Vérifie la correspondance de la méthode et de l'url
     * 
     * @private
     * @param {string} method 
     * @param {string} url 
     * @param {function} action 
     */
    _match(method, url, action) {
        let currentUrl = this.request.header.url;
        let currentMethod = this.request.header.method;

        if (currentMethod === method && currentUrl === url) {
            this._log(method, url);
            this._call(action);
        }
    }

    /**
     * Log les routes utilisées
     * 
     * @private
     * @param {string} method 
     * @param {string} url 
     */
    _log(method, url) {
        let isLogged = this.isLogged;

        if (isLogged) {
            logs.message(`${method}, ${url}`);
        }
    }

    /**
     * Charge la request et response dans l'objet
     * 
     * @public
     * @param {object} req
     * @param {object} res
     */
    use(req, res) {
        this.req = req;
        this.res = res;

        this.setRequest(req);
        this.setIsSend(false);
    }

    /**
     * Match avec les routes de type get
     * 
     * @public
     * @param {string} url 
     * @param {function} action 
     */
    get(url, action) {
        this._match('GET', url, action);
    }

    /**
     * Match avec les routes de type post
     * 
     * @public
     * @param {string} url 
     * @param {function} action 
     */
    post(url, action) {
        this._match('POST', url, action);
    }

    /**
     * Match avec les routes de type put
     * 
     * @public
     * @param {string} url 
     * @param {function} action 
     */
    put(url, action) {
        this._match('PUT', url, action);
    }

    /**
     * Match avec les routes de type delete
     * 
     * @public
     * @param {string} url 
     * @param {function} action 
     */
    delete(url, action) {
        this._match('DELETE', url, action);
    }

    /**
     * Route par défaut
     * 
     * @public
     * @param {function} action 
     */
    default(action) {
        let currentUrl = this.request.header.url;
        let currentMethod = this.request.header.method;

        this._log(currentMethod, `not found: ${currentUrl}`);
        this._call(action);
    }

    /**
     * Log les différentes requêtes entrantes
     * 
     * @public
     */
    logged() {
        this.isLogged = true;
    }
}

module.exports = new Route;