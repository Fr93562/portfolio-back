/**
 * Récupère le body de la requête
 * @param {object} req 
 * @param {function} callback 
 */
function bodyParser (req, callback) {
    let data = '';
    
    req.on('data', function( chunk ) {
      data += chunk;
    });

    req.on('end', function() {
      req.rawBody = data;

      if (data && data.indexOf('{') > -1 ) {
        data = JSON.parse(data);
      }

      callback(data);
    });
}

module.exports = bodyParser;