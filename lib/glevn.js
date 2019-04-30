const {
  forkChild
} = require('./fork');
const fs = require('fs');
const read = require('./read');
const path = require('path');
const write = require('./write');

/**
 * 
 * @param {Object} options argument settings for glevn.
 * 
 */
module.exports = function ({
  options,
  execFile
}) {

  if (options.help === true || options.h === true) {
    write.help();
    return;
  }

  //if `--no-env` argument isn't used.
  if (options.env !== false) {
    //reads `--env-src=<file_path>` and assign it as filename ( default : '.env' ) 
    const filename = options.envSrc || ".env";
    const filePath = path.join(cwd, filename);
    try {
      //try to read .env file if does not exist throws an error.
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
    //if --glevmon is used, watch files for changing
    let watchDir = options.watch || ".";
    const watcher = require('./watcher')(watchDir);
    //if `glevnfile` contains unwatched file list bu triggered
    bus.on('UNWATCHED', data => {
      watcher.unwatch(data);
    })
  }

  //Set child process' envorinment variables depends on evnfile and
  // this file's envorinment variables
  let forkOptions = {
    env: Object.assign({}, process.env, envObject),
  }


  //fork child process.
  forkChild(execFile, forkOptions, hasGlevmon, glevnfileSrc);





}