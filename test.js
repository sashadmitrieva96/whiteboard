const fs = require('fs');
const ohm = require('ohm-js');
const language = fs.readFileSync('whiteboard.ohm');
const grammar = ohm.grammar(language);


var strings = ["s","x"];
let match = grammar.match(item);
if (match.succeeded()) {
  console.log("success");
} else {
  console.error("error");
  process.exitCode = 1;
}

grammar.match(strings);

var items = [1,2];
grammar.match(items);

var items = [1,2];
grammar.match("nx;s");

