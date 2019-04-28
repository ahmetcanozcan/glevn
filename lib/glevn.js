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

  let hasGlevmon = options.glevmon;

  if ((options.glevnfile === true) || (options.gfile === true)) {
    var glevnfileSrc = options.glevnfileSrc || options.gfileSrc || ".glevnfile";

  }
  if (hasGlevmon) {
    let watchDir = options.watch || ".";
    const watcher = require('./watcher')(watchDir);
    bus.on('UNWATCHED', data => {
      watcher.unwatch(data);
    })
  }


  let forkOptions = {
    env: Object.assign({}, process.env, envObject),
  }



  forkChild(execFile, forkOptions, hasGlevmon, glevnfileSrc);





}