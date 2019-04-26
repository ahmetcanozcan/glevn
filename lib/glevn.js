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

  if (options.env !== false) {
    const filename = option.envSrc || ".env";
    const filePath = path.join(cwd, filename);
    var envObject = read.env(filePath);
  }

  if (options.global !== false) {
    const filename = option.globalSrc || ".global";
    const filePath = path.join(cwd, filename);
    var globalFile = read.global(filePath);
  }


  let forkOptions = {
    env: Object.assign({}, process.env, envObject),
  }

  let hasGlevmon = options.glevmon;

  forkChild(execFile, forkOptions, hasGlevmon);

  globalFile = globalFile || [];

  if (hasGlevmon) {
    const watcher = require('./watcher');
    let watchDir = options.watch;
    watcher(watchDir, global.UNWATCHED);
  }


}