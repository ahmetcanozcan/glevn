module.exports = function () {
  const read = require('../../lib/read/glevnfile');
  const path = require('path');

  const g = process.argv[2] || '.glevnfile';
  const FILE_PATH = path.join(process.cwd(), g);

  const glevnfile = read(FILE_PATH);

  const configs = glevnfile.CONFIG;
  const modules = glevnfile.MODULE;

  global.config = configs;

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
}