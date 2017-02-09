const fs = require('fs');
const ohm = require('ohm-js');
const language = fs.readFileSync('../whiteboard.ohm');
const grammar = ohm.grammar(language);

let test = (f) => {
  if (f.succeeded()) {
    console.log("success");
  } else {
    console.error("error");
    process.exitCode = 1;
  }
}

var strings = ['1','2'];

test(grammar.match(strings));
test(grammar.match("5"));
test(grammar.match("x["));
