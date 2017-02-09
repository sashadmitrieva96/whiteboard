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
var string2 = "x[]"
var strings = ['1','2'];
var stringx = 'Hello World';
var testArray = [1,2,3];
var testArray2 = [1,'b','a'];
test(grammar.match(strings));
test(grammar.match("5"));
test(grammar.match("x["));
test(grammar.match(stringx));
test(grammar.match(testArray2));
test(grammar.match(string2));
