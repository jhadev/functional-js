const path = require('path');

function trace() {
  const orig = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;
  const err = new Error();
  Error.captureStackTrace(err, arguments.callee);
  const callee = err.stack[0];
  Error.prepareStackTrace = orig;
  process.stdout.write(
    `${path.relative(
      process.cwd(),
      callee.getFileName()
    )}:${callee.getLineNumber()}\n`
  );
  return 'trace\n';
}

module.exports = trace;
