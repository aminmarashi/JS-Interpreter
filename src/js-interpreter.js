const acorn = require('../original-repo/acorn');
globalThis.acorn = acorn;
const { Interpreter } = require('../original-repo/interpreter');

export default Interpreter;
