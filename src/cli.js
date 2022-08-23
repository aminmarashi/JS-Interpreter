const fs = require('fs');
const readline = require('readline');
const minimist = require('minimist');
const acorn = require('../original-repo/acorn');
globalThis.acorn = acorn;
const { Interpreter } = require('../original-repo/interpreter');

const argv = minimist(process.argv.slice(2));

const lineReader = readline.createInterface({
  input: argv._.length
    ? fs.createReadStream(argv._[0])
    : process.stdin,
});

let code = '';

lineReader.on('line', (line) => {
  code += `${line}\n`;
});

const initFunc = (interpreter, scope) => {
  interpreter.setProperty(scope, 'console',
    interpreter.nativeToPseudo({
      log(...args) { console.log(...args); },
    }));
};

lineReader.on('close', () => new Interpreter(code, initFunc).run());
