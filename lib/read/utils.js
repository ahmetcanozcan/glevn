/**
 * contains shared utility functions for read module.
 * 
 * 
 */



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


/**
 * Removes comment part of a line and
 * Delete white spaces.
 *
 * @param {String} line : a line with comments
 * and unneccessary spaces
 *
 * @returns {String} formatted line
 */
function formatLine(line, removeSpaces = true) {
  let sharpIndex = line.indexOf("#");
  if (sharpIndex > 0) {
    //Remove chars after '#'
    line.substr(sharpIndex, line.length - sharpIndex);
  } else if(sharpIndex === 0) {
    return '';
  } else {

    //remove white spaces
    if (removeSpaces) {
      line = line.replace(" ", "")
    } else {
      line = line.trim();
    }
    line = line.replace("\r", "");

    return line;
  }




}


module.exports = {
  formatLine: formatLine,
  lineToObject: lineToObject
}