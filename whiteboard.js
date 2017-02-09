const fs = require('fs');
const ohm = require('ohm-js');
const language = fs.readFileSync('whiteboard.ohm');
const grammar = ohm.grammar(language);

let match = grammar.match(process.argv[2]);
if (match.succeeded()) {
  console.log("success");
} else {
  console.error("error");
  process.exitCode = 1;
}
