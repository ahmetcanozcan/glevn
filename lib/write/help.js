const path = require('path');
const fs = require('fs');

/**
 * 
 * 
 */
module.exports = function () {
  let filePath = path.join(__dirname, '..', '..', 'doc', 'cli', 'help.txt');
  let text = fs.readFileSync(filePath, 'utf-8');
  log.warn(text);
}