const fork = require('child_process').fork;


/**
 * Forks a new child process and set its events.
 * @param {Object} options : option paramater of child_process.fork() 
 * @param {String} execFile : name of the file will execute.
 * 
 * @returns {void}
 */
function forkChildProcess(execFile, options) {


  const KILL_SIGNAL = "SIGHUP";

  const invoke = () => {

    log('Starting new process...');
    let forked = fork(path.join(cwd, execFile), options);

    forked.on('error', msg => {
      log.error(msg);
      log.warn('\nApp crashed wait for changes...');
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

  bus.on('file_change', () => {
    log('Changes detected...');
    kill();
    invoke();
  });

}







module.exports = {
  forkChild: forkChildProcess
}