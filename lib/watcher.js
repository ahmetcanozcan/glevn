const chokidar = require('chokidar');
const path = require('path');

/**
 * watchs files under the given folder. When detect change, emit event to **EventBus**
 * 
 * @param {String} directory : directory name  
 * @param {Array} unwatchedFiles : list of files that's unwatched.
 */
module.exports = function (directory, unwatchedFiles) {
  directory = directory || '.';
  const watcher = chokidar.watch(directory, {
    cwd: process.cwd(),
    persistent: true,
  });

  if (!unwatchedFiles) {
    watcher.unwatch(unwatchedFiles);
  }

  watcher.on('change', path => bus.emit('file_change'));

}