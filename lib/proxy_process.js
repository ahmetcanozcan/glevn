/**
 * @argument process.argv[2] : file path of .glevnfile
 * @argument process.argv[3] : file path will executed after reading
 * 
 */
(function () {
  (function () {
    const read = require('../lib/read/glevnfile');
    const path = require('path');
    //reads file name of glevnfile 
    const g = process.argv[2] || '.glevnfile';
    const FILE_PATH = path.join(process.cwd(), g);

    const glevnfile = read(FILE_PATH);

    const configs = glevnfile.CONFIG;
    const modules = glevnfile.MODULE;
    //sends unwatched file list to parent process
    process.send({
      unwatched: glevnfile.UNWATCHED
    });

    //makes config file global
    global.config = configs;
    //import modules and assign it.
    for (let i in modules) {
      let temp = modules[i];
      let refArr = temp.ref.split('.');
      let m = require(refArr[0]);
      for (let i = 1; i < refArr.length; i++) {
        m = m[refArr[i]];
      }

      let name = temp.name || refArr.reverse()[0];
      global[name] = m;



    }
  })()
  let __glevn__file_name4568 = process.argv[3];
  process.argv = process.argv.splice(2, 2);
  //runs the node based app.
  require(require('path').join(process.cwd(), __glevn__file_name4568));

})()