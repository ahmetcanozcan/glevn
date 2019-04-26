const fork = require('child_process').fork;


/**
 * Forks a new child process and set its events.
 * @param {Object} options : option paramater of child_process.fork() 
 * @param {String} execFile : name of the file will execute.
 * @param {Boolean} glevmon : will process restart when it crashed.
 * 
 * @returns {void}
 */
function forkChildProcess(execFile, options, glevmon) {


  const KILL_SIGNAL = "SIGHUP";

  const invoke = () => {

    log('Starting new process...');
    let forked = fork(path.join(cwd, execFile), options);

    forked.on('error', msg => {
      log.error(msg);
      if (glevmon) {
        log.warn('\nApp crashed wait for changes...');
      }
    });

    forked.on('exit', (code, signal) => {
      if (code === 0) {
        log('Exiting process normally...')
      }
    });


    this.child = forked;
  }

  function kill() {
    this.child.kill();
  }


  ///////  EVENTS  ////////
  if (glevmon) {
    bus.on('file_change', () => {
      log('Changes detected...');
      kill();
      invoke();
    });
  }

}







module.exports = {
  forkChild: forkChildProcess
}