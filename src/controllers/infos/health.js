/**
 * Controller de health/get
 *
 * @param {object} req 
 * @param {object} res 
 * @returns : response
 */
function health(req, res) {
    let response = 'App is up.';

    return res.send(200, { content: response});
};

module.exports = health;