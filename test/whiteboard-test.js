const assert = require('assert');
const fs = require('fs');
const ohm = require('ohm-js');
const language = fs.readFileSync('whiteboard.ohm');
const grammar = ohm.grammar(language);

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
    `Num x = 00.7654`,
    ` `


];

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
    `true == (0are)`,
    `(num x = 00.7654)`


];

describe('Grammar', () => {
  for (test in positiveTests) {
    it('matches with programs it should', () => {
          assert.equal(grammar.match(positiveTests[test]).succeeded(), true)

    });
  }
  for (test in negativeTests) {
    it('rejects invalid programs', () => {

          assert.equal(grammar.match(negativeTests[test]).succeeded(), false)
    });
  }
});

// AST tests

const AST_TESTS = [
    [
      `if true == ryan: return true. else: return false.`,
      `{ Program (If (Case (BinaryExpression Left : Bool : true) (Op : ==) (Right : VariableId : ryan)) (IfBlock (B
lock (Return -> Bool : true))))(ElseBlock (Block (Return -> Bool : false)))
 }`
    ],

    [
    `kevin = 4`,
    `{Program (VariableID = 'kevin', Type = '',  Value = NumLit = 4)}`
    ]
];

//
// describe('AST', () => {
//   it('generates an ast for input whiteboard code', () => {
//     AST_TESTS.forEach((x) => {
//       assert.equal(parse(x[0]),x[1]);
//     });
//
//   });
// });
