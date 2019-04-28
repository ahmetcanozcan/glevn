/**
 * read .glevnfile or glevnfile.json file and
 * set custom global variables with glen-global module.
 *
 * .global file haves basic syntax that ignores spaces , is case sensetive and  provide comments with some rules.
 *   - comment lines must be start with `#`.
 *   - comments can't be used in code lines
 *
 * .global codes writes line by line. some examples:
 *
 * `DEFINE <TYPE>` execute the lines with rules of `<TYPE>` untill next `DEFINE` block.
 *
 *
 * `DEFINE MODULE` refer  defining module block.
 * `import <module> as <name>` sets the module as `global.<name>`
 * `import <module>` sets the module as  `global.<module>`
 * `import <module.child> as <name>` as above but sets only child module.
 * `import <module.child>` as above but sets only child module as `global.<child>`.
 *
 *  NOTE: `as` argument are strongly suggested to prevent overriding modules.
 *
 * `DEFINE CONFIG` refer defining configuration block.
 * config values must be primitive type.
 *
 * `assign <key> = <value>` sets the value as `global.config.<key>`
 * `assign-num <key> = <value>` as above but converts value to number, 
 * `assign-bool <key> = <value>`as above but converts value to boolean
 *
 * `DEFINE UNWATCH` refer defining unwatching block.
 * unwatch value must be path of the file respect to root directory
 *
 * `<directory-name>/` directory names must end with `/`
 * 
 * global.json file's format must be like that:
 * {
 *  <TYPE>:[<typeObject>],
 *  <TYPE>:[<typeObject>],
 * }
 *
 */

const {
  lineToObject,
  formatLine
} = require("./utils");
const fs = require("fs");

/**
 * keeps the type of executing block.
 */
const DEFINES = {
  START: 1,
  MODULE: 2,
  CONFIG: 3,
  UNWATCHED: 4
};

/**
 * Gets exact path of global file(`.global` or `global.json`) and
 * generate a object
 *
 * @param {String} path : exact path.
 * @returns {Object}  type:{ MODULE, CONFIG, UNWATCHED }
 */
module.exports = function (path) {
  //if file is glevnfile.json
  if (path.split(".").reverse()[0] === "json") {

    let obj = require(path);
    if (checkJson(obj)) return obj;
    else throw new Error("json file is not valid for glevnfile.");
  }

  let file = fs.readFileSync(path).toString();
  let lines = file.split("\n").filter(line => line !== "");
  let defineState = DEFINES.START;
  let resultObject = {
    MODULE: [],
    CONFIG: {},
    UNWATCHED: []
  };
  lines.forEach(line => {
    line = formatLine(line, false);
    //if line is comment or undefined, skip it.
    if (!line) {
      return;
    }

    let wordArray = line.split(" ");
    let argument = wordArray[0];
    let parameters = wordArray.slice(1);

    if (argument === "DEFINE") {
      //set define state. 
      defineState = DEFINES[parameters[0]];
      //if parameter is undefined throw error
      if (!defineState) {
        console.debug(defineState);
        //throw new Error("undefined parameter for argument  'DEFINE'");
        return;
      }
    } else if (argument === "import" && defineState === DEFINES.MODULE) {

      resultObject.MODULE.push({
        name: parameters[2] || '',
        ref: parameters[0]
      });

    } else if (argument.startsWith('assign') && defineState === DEFINES.CONFIG) {

      let {
        key,
        value
      } = lineToObject(parameters.join(''));

      if (argument.includes('num', 5)) {
        value = parseInt(value, 10);
      } else if (argument.includes('bool', 5)) {
        value = (value === 'true') || (value === 'True');
      }

      resultObject.CONFIG[key] = value;

    } else if (defineState === DEFINES.UNWATCHED) {
      resultObject.UNWATCHED.push(argument);
    } else {}

  });

  return resultObject;
};

/**
 * Check the global.json file is valid
 * @param {Object} json : global.json file
 * @returns {Boolean} : is valid or not
 */
function checkJson(json) {
  return true;
}

module.exports.DEFAULT = {
  MODULE: [],
  CONFIG: {},
  UNWATCHED: []
};