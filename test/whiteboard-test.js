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

let positiveTests = [
    `if true == ryan: .`,
    `array[3].funcall(p1, p2)`,
    `Type Square = (w, h):
        width = w
        height = h
        area = ():
            return width * height
            .
    .`,
    `a[0] or true and ('baller' >= area[2](a, b, c))`,
    `2534.7654`,
    ` `


]

let negativeTests = [
    `sasha.cool = true(`,
    `if x: return `,
    `for 5 in iter:  .`,
    `Type Square = (w, h):
        width = w
        height = h

        area = ()
        width * height
        .
    .`,
    `true == (0are)`


]





describe('Grammar', () => {
  it('matches with programs it should', () => {
    for (test in positiveTests) {
        assert.equal(grammar.match(positiveTests[test]).succeeded(), true)
    }
  });

  it('rejects invalid programs', () => {
    for (test in negativeTests) {
        assert.equal(grammar.match(negativeTests[test]).succeeded(), false)
    }
  });
});

// describe('Grammar', () => {
//   it('Tests to see if certain expressions match to syntax tree', done => {
//     assert.equal(true, true);
//     assert.equal(test(grammar.match(strings),true), true);
//     assert.equal(test(grammar.match("5"), true), true);
//     assert.equal(test(grammar.match("x]"), false), true);
//     assert.equal(test(grammar.match(stringx), true), true);
//     assert.equal(test(grammar.match(testArray2), false), true);
//     assert.equal(test(grammar.match(string2), false), true);
//     assert.equal(test(grammar.match(ifstmt), true), true);
//     assert.equal(test(grammar.match(aTrueTest), true), true);
//     done();
//   });
// });
