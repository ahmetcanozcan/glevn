var cli = require('../../lib/cli');

test('Parses command correctly', () => {


  expect(cli.parse('node glevn . --src=bin/.env'.split(' ')).options).toMatchObject({
    'src': 'bin/.env'
  });

  expect(cli.parse('node glevn app.js --src bin/.env').execFile).toMatch(/.js/);

  expect(cli.parse('node glevn --src bin/.env').execFile).toMatch(/index.js/);

  expect(cli.parse('node glevn --global --cluster 5 -c').options).toMatchObject({
    global: true,
    cluster: 5,
    c: true
  })

})