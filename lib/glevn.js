const {
  forkChild
} = require('./fork');
const fs = require('fs');
const read = require('./read');
const path = require('path');
const fork = require('child_process').fork;


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
    const filename = options.envSrc || ".env";
    const filePath = path.join(cwd, filename);
    try {
      var envObject = read.env(filePath);
    } catch (error) {
      log.warn('can\'t find envoirment file(default .env file in main directory)\n');
    }
  }

  if (options.global === true) {
    const filename = options.globalSrc || ".global";
    const filePath = path.join(cwd, filename);
    var globalFile = read.global(filePath);
  }

  let forkOptions = {
    env: Object.assign({}, process.env, envObject),
  }

  let hasGlevmon = options.glevmon;

  forkChild(execFile, forkOptions, hasGlevmon);


  globalFile = globalFile || require('../lib/read/global').DEFAULT_GLOBAL;
  if (hasGlevmon) {
    const watcher = require('./watcher');
    let watchDir = options.watch;
    watcher(watchDir, globalFile.UNWATCHED);
  }


}