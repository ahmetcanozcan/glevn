/**
 *  glevn configure some variables through configuration files
 *  such as `.env` and `.global` in the  current working directory
 * 
 * this configuration files my be json file.
 *  
 */

module.exports.env = require('./env');
module.exports.global = require('./global');