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

/**
 * @param {String} path: path of the envoirment variable file.
 * path format must be  exact path of the file.
 * 
 * @returns {Object} envoirment variables
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
      if (line) {
        line = formatLine(line);
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

/**
 * Removes comment part of a line and
 * Delete white spaces.
 *
 * @param {String} line : a line with comments
 * and unneccessary spaces
 *
 * @returns {String} formatted line
 */
function formatLine(line) {
  let sharpIndex = line.indexOf("#");
  if (sharpIndex >= 0) {
    //Remove chars after '#'
    line.substr(sharpIndex, line.length - sharpIndex);

  }
  //remove white spaces
  line = line.replace(" ", "").replace("\r", "");

  return line;
}



/**
 * 
 * 
 * @param {String} line : removed comment and spaces
 * @return {Object} format line to {key,value} object
 */
function lineToObject(line) {
  let arr = line.split('=');
  return {
    key: arr[0],
    value: arr[1]
  }
}