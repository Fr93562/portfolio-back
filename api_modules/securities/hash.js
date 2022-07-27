let { createHash } = require('crypto');

/**
 * Génère un hash SHA256 en fonction du secre
 * @param {string} secret 
 * @returns : hash
 */
function create(secret) {
  return createHash('sha256').update(secret).digest('hex');
};

let hash = {
  create: create,
};

module.exports = hash;