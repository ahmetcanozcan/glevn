#!/usr/bin/env node

require('../lib/utils');
const glevn = require('../lib');

const cli = require('../lib/cli');

let options = cli.parse(process.argv);


glevn(options);