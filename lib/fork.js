const fork = require('child_process').fork;
const path = require('path');
const Message = require('./utils/Message');
/**
 * Forks a new child process and set its events.
 * @param {Object} options : option paramater of child_process.fork() 
 * @param {String} execFile : name of the file will execute.
 * @param {Boolean} glevmon : will process restart when it crashed.
 * 
 * @returns {void}
 */
function forkChildProcess(execFile, options, hasGlevmon, glevnfileSrc) {



  const KILL_SIGNAL = "SIGHUP";


  let invoke = () => {
    //resets console font color.
    log.reset();
    log.warn('Starting new process...');
    if (glevnfileSrc) {
      //if glevnfile does exist, forks the child process through a proxy process
      var forked = fork(path.join(__dirname, 'proxy_process.js'), [glevnfileSrc, execFile], options);
    } else {
      //else forks the child process normally
      var forked = fork(path.join(cwd, execFile), options);
    }

    //When an error occured in child process, glevn give informatin. and waits for change
    forked.on('error', msg => {
      if (hasGlevmon) {
        log.warn('\nApp crashed wait for changes...');
      }
    });

    //Provides communication between child and parent process
    forked.on('message', msg => {
      if (msg.unwatched) {
        bus.emit('UNWATCHED', msg.unwatched);
      }
    })

    forked.on('exit', (code, signal) => {
      //if exit code is zero, it means process executed normally
      if (code === 0) {
        log('Exiting process normally...')
      } else if (code === 1 && signal === null) {
        log.error('App crashed. ', ' Waiting for changes....');
      }
    });

    this.child = forked;
  }

  /**
   * forces the child process to stop
   */
  function kill() {
    this.child.kill();
  }



  /**
   * Event listeners
   */

  if (hasGlevmon) {
    //When a file changes in scope. kill the current child process and fork another child process
    bus.on('file_change', () => {
      log('Changes detected...');
      kill();
      invoke();
    });
  }

  //invokes firts child process
  invoke();

}







module.exports = {
  forkChild: forkChildProcess
}