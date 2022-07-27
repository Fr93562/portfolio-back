/**
 * Controller de health/get
 *
 * @param {object} req 
 * @param {object} res 
 * @returns : response
 */
 function maintenance(req, res) {
    let response =  `API is up!`;
    
    return res.send(200, { content: response});
};

module.exports = maintenance;