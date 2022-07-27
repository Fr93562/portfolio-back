let logs = require('../../api_modules/services/logs');
let routers = require('../../api_modules/services/Router');

let health = require('../controllers/infos/health');
let help = require('../controllers/infos/help');
let notFound = require('../controllers/errors/NotFound');

module.exports= (req, res) => {
    routers.use(req, res);
    routers.logged();

    logs.message('router - entrée');

    routers.get('/health', health);
    routers.get('/help', help);

    routers.default(notFound);
};

