function log(...msg) {
  console.log("\x1b[35m", ...msg);
  log.clear();
}

log.error = (...msg) => {
  msg = msg.map(x => `[ERR] ${x}\n`)
  console.error("\x1b[31m", ...msg);
  log.clear();
}

log.warn = (...msg) => {
  console.warn("\x1b[33m", ...msg);
  log.clear();
}

log.green = (...msg) => {
  console.log("\x1b[32m", ...msg);
  log.clear();
}

log.debug = (...msg) => {
  console.debug("\x1b[35m", ...msg);
  log.clear();
}
log.clear = () => {
  console.log("\x1b[37m");
}
log.reset = () => {
  console.log("\x1b[0m");
}

module.exports = log;