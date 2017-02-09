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
var ifStatement = "if (1 == 1):    return true."
var ifStatementFail = "if (1 == 1):    return true"
var string2 = "x[]"
var strings = ['1','2'];
var stringx = 'Hello World';
var testArray = [1,2,3];
var testArray2 = [1,'b','a'];
var funct = "fun helloworld = ():    for i in range(5):    x . ."
var funct2 = "fun helloworld = ()    for i in range(5):    x . ."
var adder = "1 + 2";
var subtract = "2-1";
test(grammar.match(strings)); // (success) can have a list of numbers
test(grammar.match("5")); // (success) takes in the number 5
test(grammar.match("x[")); // (error) can't do x[
test(grammar.match(stringx)); // (success) strings with a space
test(grammar.match(testArray2)); // (success) Array that takes in multiple values 
test(grammar.match(string2)); // (error) cant do x[]
test(grammar.match(ifStatement)); // (success) if statement 
test(grammar.match(ifStatementFail)); // (error) missing a period
test(grammar.match(funct)); // (success) function works
test(grammar.match(funct2)); // (error) missing : after ()
test(grammar.match(adder)); // (success) adding 1 + 2
test(grammar.match(subtract)); // (success) subtract 2-1