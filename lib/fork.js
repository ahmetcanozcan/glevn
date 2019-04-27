const fork = require('child_process').fork;
const path = require('path');

/**
 * Forks a new child process and set its events.
 * @param {Object} options : option paramater of child_process.fork() 
 * @param {String} execFile : name of the file will execute.
 * @param {Boolean} glevmon : will process restart when it crashed.
 * 
 * @returns {void}
 */
function forkChildProcess(execFile, options, hasGlevmon) {



  const KILL_SIGNAL = "SIGHUP";

  let invoke = () => {
    log.reset();
    log.warn('Starting new process...');

    let forked = fork(path.join(cwd, execFile), options);

    forked.on('error', msg => {
      if (hasGlevmon) {
        log.warn('\nApp crashed wait for changes...');
      }
    });

    forked.on('exit', (code, signal) => {
      if (code === 0) {
        log('Exiting process normally...')
      } else if (code === 1 && signal === null) {
        log.error('App crashed. ', ' Waiting for changes....');
      }
    });


    this.child = forked;
  }

  function kill() {
    this.child.kill();
  }


  ///////  EVENTS  ////////
  if (hasGlevmon) {
    bus.on('file_change', () => {
      log('Changes detected...');
      kill();
      invoke();
    });
  }

  invoke();

}







module.exports = {
  forkChild: forkChildProcess
}