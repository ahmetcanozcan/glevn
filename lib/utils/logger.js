function log(msg) {
  console.log(msg);
}

log.error = msg => {
  console.error(msg);
}

log.warn = msg => {
  console.warn(msg)
}

log.debug = msg => {
  console.debug(msg);
}

module.exports = log;