/**
 *  glevn configure some variables through configuration files
 *  such as `.env` and `.glevnfile` in the  current working directory
 * 
 * this configuration files my be json file.
 *  
 */

module.exports.env = require('./env');
module.exports.glevnfile = require('./glevnfile');