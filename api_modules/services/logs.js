/**
 * Génère la date du log
 * @returns : date actuelle au format string
 */
function getTime() {
    let date = new Date();
    let month = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
    let time = `${date.getHours()}:${date.getMinutes()}`;

    return `${month} ${time}`;
}

/**
 * Affiche un message
 * @async
 * @param {string} type 
 * @param {any} content 
 */
 async function message(type, content) {
    console.log(`[${type}] ${getTime()} - `,  content);
}

/**
 * Affiche un message de type log
 * @async
 * @param {any} content 
 */
async function log(content) {
    message('info', content);
}

/**
 * Affiche un message de type warning
 * @async
 * @param {any} content 
 */
async function warning(content) {
    message('warning', content);
}

/**
 * Affiche un message de type warning
 * @async
 * @param {any} content 
 */
 async function error(content) {
    message('error', content);
}

let logs = {
    message: log,
    warning: warning,
    error: error,
};

module.exports = logs;