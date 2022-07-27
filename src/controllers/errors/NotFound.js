/**
 * Controller de notFound/get
 * @param {*} req 
 * @param {*} res 
 * @returns : response
 */
function notFound(req, res) {
    let response =  `La route n'as pas été trouvée.`;
    
    return res.send(404, { content: response});
};

module.exports = notFound;