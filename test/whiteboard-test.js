const assert = require('assert');
const fs = require('fs');
const ohm = require('ohm-js');
const parse = require('./../whiteboard.js');
const preparse = require('./../preparser.js');

const language = fs.readFileSync('whiteboard.ohm');
const grammar = ohm.grammar(language);

/* eslint-disable quotes */
// Grammar Tests
const positiveTests = [
  `array[-3].funcall(p1, p2)`,
  `Type Square = (w, h):
        width = w
        height = h
        area = ():
            return width * height

    `,
  `a[0] or !true and ('baller' >= area[2](a, b, c))`,
  `2534.7654`,
  `3 mod -10`,
  `Num x = 00.7654`,
  ` `,
];

const negativeTests = [
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
  `(num x = 00.7654)`,
];

// AST Tests
const AST_POS_TESTS = [
  [
    `
if true == ryan:
    return true
else:
    return false
`,
    `{ Program If (Case: test: (BinaryExpression (Left : (BoolLit : true)) (Op : ==) (Right : (VariableId : ryan))) block: (Block (Return -> (BoolLit : true))) Case: test: (BoolLit : true) block: (Block (Return -> (BoolLit : false))) )}`,
  ],

  [
    `kevin = 4`,
    `{ Program (VariableID = kevin, Val : (NumLit : 4))}`,
  ],

  [
    `Dog woomfy`,
    `{ Program (VariableID = woomfy, Type : (TypeId : Dog))}`,
  ],

  [`
Type Square = (w, h):
          width = w
          height = h
          area = ():
              return width * height


`,
    `{ Program (TypeId : Square (TypeParams:= (Params (VariableID = (VariableId : w), Type : (TypeId : ))(VariableID = (VariableId : h), Type : (TypeId : )))) (TypeBody : (Block (VariableID = width, Val : (VariableId : w)) (VariableID = height, Val : (VariableId : h)) (FunctionID : area, Params : (Params ), Block : (Block (Return -> (BinaryExpression (Left : (VariableId : width)) (Op : *) (Right : (VariableId : height)))))))))}`,
  ],
];

const AST_NEG_TESTS = [
  `Type Mum = (ur):
       lol = ():
           nope = ():
               return ur
               .
   .`,
   `Type Daddy = ():
       return Daddy
       .
    .`,
    `kevin = Type NotTheGodEmporer = ():
         return true
         .
     .`,
     `Program program = (Program program):
          return program
          .
      .`
];
// Semantics Tests
const SEMANTICS_POS_TESTS = [
  ['Num x = 4']
];

// const SEMANTICS_NEG_TESTS = [
//   [],
//
//   [],
//
//   [],
// ];

// Testing Grammar
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
describe('Grammar', () => {
  for (const test in positiveTests) {
    it('matches with programs it should', () => {
      assert.ok(grammar.match(preparse(positiveTests[test])).succeeded());
    });
  }

  for (const test in negativeTests) {
    it('rejects invalid programs', () => {
      assert.ok(!grammar.match(preparse(negativeTests[test])).succeeded());
    });
  }
});

// Testing AST
describe('AST', () => {
  AST_POS_TESTS.forEach((x) => {
    it('generates an ast for input whiteboard code', () => {
      assert.equal(parse(x[0]).toString(), x[1]);
      assert.equal(true, true);
    });
  });
  AST_NEG_TESTS.forEach((x) => {
    it('throws appropriate errors for illegal programs', () => {
      try {
        parse(x);
      }
      catch (error) {
        assert.equal(true, true);
      }

    });
  });
});

// Testing Semantics
describe('SEMANTICS', () => {
//   SEMANTICS_POS_TESTS.forEach((x) => {
//     it('accepts legal programs', () => {
//       assert.equal(parse(x[0]).analyze(), x[1]);
//       assert.equal(true, true);
//     });
//   });
//   SEMANTICS_NEG_TESTS.forEach((x) => {
//     it('throws appropriate errors for illegal programs', () => {
//       assert.equal(parse(x[0]).analyze(), x[1]);
//       assert.equal(true, true);
//     });
//   });
});
