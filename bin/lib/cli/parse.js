/***
 * glevn is a utility to manage envoirment and global variables with some extra features.
 * 
 * glevn can be run  in a several ways:
 * 
 * `glevn foo.js` run foo.js with global envoirment in the .env 
 * `glevn` tries to run main property in package.json
 * `glevn` if there is no package.json, tries to run index.js
 * `glevn --args1 foo.js --args2`  eats -args1 and rum foo.js normally with args2.
 * `glevn --args` tries to run package.json#main properity (or index.js)
 */

const parser = require('yargs-parser');
const fs = require('fs');
const os = require('os');
const path = require('path');
let existsSync = fs.existsSync || os.existsSync;



/**
 * Parses the command line arumgant(process.argv) and returns the
 * object contains glevn options, args and  execFile  
 * 
 *  @param {Array} argv full process arguments including 'node' leading arg
 *  @returns {Objects} { options , execFile }
 */
module.exports = function (argv) {

  if (typeof argv === 'string') {
    argv = argv.split(' ');
  }

  let args = format(argv.slice(2));
  let execFile = args[0];

  let parsed = parser(args.slice(1), {
    configuration: {
      "dot-notation": false,
    }
  });



  return {
    execFile: execFile,
    options: parsed,
  }

}

/**
 * Detect the position of the user script and
 * replace it to second index
 *  
 * 
 * @param {Array} args full process arguments including 'node' leading arg
 * @returns {Array} 
 */

function format(args) {
  let scriptIndex = 1;
  for (let i = 0; i < args.length; i++) {
    //if arguments looks like a file
    //replace it and break the loop
    if (args[i] === '.' || existsSync(args[i])) {
      let temp = args[i];
      args.splice(i, 1);
      args.splice(0, 0, temp);
    }
  }

  //if there is no script location in args array.
  //add into `index.js` file to args[1]
  args.splice(0, 0, 'index.js');
  return args;
}