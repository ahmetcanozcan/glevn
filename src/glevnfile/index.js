/**
 * 
 * 
 * 
 */

const Message = require('../../lib/utils/Message');

module.exports = function () {

  let cont = true;
  process.on('message', ({
    head,
    body
  }) => {
    if (head.from === 'glevn') {
      cont = false;
      console.log(cont);
      for (key in body) {
        switch (key) {
          case "CONFIG":
            console.log('Config properties adding...');
            global.config = body.CONFIG;
            break;
          case "MODULE":
            console.log('Module properities adding...');
            for (let i = 0; i < body.MODULE.length; i++) {
              let temp = body.MODULE[i];
              let moduleArr = temp.ref.split('.');
              let module = require(moduleArr[0]);
              for (let j = 1; j < moduleArr.length; j++) {
                module = module[moduleArr[j]];
              }
              let module_name = temp.name || moduleArr.reverse()[0];
              global[module_name] = module;
            }
            break;

          default:
            break;
        }
      }

    }
  });
  process.send(new Message().from('app').add('handshake', true));



  console.debug('cont...')

}