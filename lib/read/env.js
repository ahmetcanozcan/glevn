/**
 *  reads the files in the given path and
 *  returns a object.
 *
 *  syntax of file in the given path must be like that:
 *  KEY=VALUE
 *  
 *  also json files is supported.
 */

const fs = require("fs");
const {
  lineToObject,
  formatLine
} = require('./utils');
/**
 * @param {String} path: path of the environment variable file.
 * path format must be  exact path of the file.
 * 
 * @returns {Object} environment variables
 */
module.exports = function (path) {
  if (path.split('.').reverse()[0] === 'json') {
    //Read .json file
    let obj = require(path);
    return obj;
  } else {
    //Read .env file.
    let file = fs.readFileSync(path).toString();
    if (!file) throw Error("can't read file")
    let lines = file.split("\n");
    let obj = {};
    lines.forEach(line => {
      line = formatLine(line);
      if (line) {
        let {
          key,
          value
        } = lineToObject(line);
        obj[key] = value;
      }
    });
    return obj;
  }


};