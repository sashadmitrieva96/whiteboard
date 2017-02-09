const assert = require('assert');
const fs = require('fs');
const ohm = require('ohm-js');
const language = fs.readFileSync('whiteboard.ohm');
const grammar = ohm.grammar(language);

let test = (f, e) => {
  let x = f.succeeded() ? true : !e;
  return x;
}
//
var ifstmt = "if (1 == 1): .";
var string2 = "x[]"
var strings = ['1','2'];
var stringx = 'Hello World';
var testArray = [1,2,3];
var testArray2 = [1,'b','a'];
var aTrueTest = "if (num < 2 or num > LARGEST): \
        x = 4 \
    ."


describe('Grammar', () => {
  it('Tests to see if certain expressions match to syntax tree', done => {
    assert.equal(true, true);
    assert.equal(test(grammar.match(strings),true), true);
    assert.equal(test(grammar.match("5"), true), true);
    assert.equal(test(grammar.match("x]"), false), true);
    assert.equal(test(grammar.match(stringx), true), true);
    assert.equal(test(grammar.match(testArray2), false), true);
    assert.equal(test(grammar.match(string2), false), true);
    assert.equal(test(grammar.match(ifstmt), true), true);
    assert.equal(test(grammar.match(aTrueTest), true), true);
    done();
  });
});
