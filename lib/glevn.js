const {
  forkChild
} = require('./fork');
const fs = require('fs');
const read = require('./read');
const path = require('path');



/**
 * 
 * @param {Object} options argument settings for glevn.
 * 
 */
module.exports = function ({
  options,
  execFile
}) {

  if (options.noEnv !== true) {
    const filename = option.envSrc || ".env";
    const filePath = path.join(cwd, filename);
    var envObject = read.env(filePath);
  }

  let forkOptions = {
    env: Object.assign({}, process.env, envObject),
  }

  forkChild(execFile, forkOptions);


}