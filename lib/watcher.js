const chokidar = require('chokidar');
const path = require('path');

/**
 * watchs files under the given folder. When detect change, emit event to **EventBus**
 * 
 * @param {String} directory : directory name  
 */
module.exports = function (directory) {
  directory = directory || '.';
  const watcher = chokidar.watch(directory, {
    cwd: process.cwd(),
    persistent: true,
  });

  watcher.on('change', path => bus.emit('file_change'));

  return watcher;
}