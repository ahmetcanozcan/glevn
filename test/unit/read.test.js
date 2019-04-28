const read = require('../../lib/read');
const path = require('path');
const ROOT_URL = path.join(process.cwd(), 'test', 'test_files');
test('Reads env.json file correctly', () => {

  //Check program can reads env.json
  expect(read.env(path.join(ROOT_URL, 'env.json'))).toMatchObject({
    SECRET: "123456",
    FOO: "BAR",
    HELLO: "WORLD"
  });
});

test('Reads .env file correctly', () => {
  expect(read.env(path.join(ROOT_URL, '.env'))).toMatchObject({
    SECRET: "123456",
    FOO: "BAR",
    HELLO: "WORLD"
  });

  expect(read.env(path.join(ROOT_URL, '.envc'))).toMatchObject({
    SECRET: "123456",
    FOO: "BAR",
    HELLO: "WORLD"
  });
})

test('Reads glevnfile.json correctly', () => {

  expect(read.glevnfile(path.join(ROOT_URL, 'glevnfile.json')))
})

test('Reads .glevnfile files correctly', () => {

  const glevnfile = require(path.join(ROOT_URL, 'glevnfile.json'));

  expect(read.glevnfile(path.join(ROOT_URL, '.glevnfile'))).toMatchObject(glevnfile);
});