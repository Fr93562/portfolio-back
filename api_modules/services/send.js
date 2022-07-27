/**
 * Ajoute la fonction send à l'objet node res
 *
 * @param {integer} status: statut de la requête à envoyer
 * @param {string} content: contenu du body
 * @param {string} type: permet d'indiquer le content-type
 */
function send (status, content, type) {
    let response = {
        contentType: 'text/json',
        status: 404,
        body: JSON.stringify(content),
    }

    if (status) {
        response.status = status;
    }
    
    if (type) {
        response.contentType = type;
    }

    this.writeHead(response.status, {'Content-Type': response.contentType});
    this.end(response.body);

    // if (!this.writableEnded) {

    //     this.writeHead(response.status, {'Content-Type': response.contentType});
    //     this.end(response.body);
    // }
}

module.exports = send;
