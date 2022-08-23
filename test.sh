npm link
mkdir test
pushd test
echo '{}' > package.json
npm link js-interpreter
cat > test.js <<EOF
const Interpreter = require('js-interpreter');

const initFunc = (interpreter, scope) => {
  interpreter.setProperty(scope, 'console',
    interpreter.nativeToPseudo({
      log(...args) { console.log(...args); },
    }));
};
(new Interpreter('console.log(\"Importing works!\")', initFunc)).run();
EOF
node test.js
echo "console.log('CLI works!');" | ./node_modules/.bin/js-interpreter
popd
rm -rf test
