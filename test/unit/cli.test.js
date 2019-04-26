var cli = require('../../lib/cli');
const _ = require('lodash');
test('Parses command correctly', () => {


  expect(cli.parse('node glevn . --src=bin/.env'.split(' ')).options).toMatchObject({
    'src': 'bin/.env'
  });



  expect(_.pick(cli.parse('node glevn --no-env --env-src .envfile --set-globals').options, ["env", "envSrc", "setGlobals"])).toMatchObject({
    env: false,
    envSrc: ".envfile",
    setGlobals: true
  })

  expect(cli.parse('node glevn app.js --src bin/.env').execFile).toMatch(/.js/);

  expect(cli.parse('node glevn --src bin/.env').execFile).toMatch(/index.js/);

  expect(cli.parse('node glevn --global --cluster 5 -c').options).toMatchObject({
    global: true,
    cluster: 5,
    c: true
  })

})