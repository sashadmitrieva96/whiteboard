const assert = require('assert');
const fs = require('fs');
const ohm = require('ohm-js');

const language = fs.readFileSync('whiteboard.ohm');
const grammar = ohm.grammar(language);

const Program = require('./../entities/program.js');
const Block = require('./../entities/block.js');
const IfStatement = require('./../entities/if_statement.js');
const ForStatement = require('./../entities/for_statement.js');
const ReturnStatement = require('./../entities/return_statement.js');
const BreakStatement = require('./../entities/break.js');
const VariableDeclaration = require('./../entities/variable_declaration.js');
const TypeDeclaration = require('./../entities/type_declaration.js');
const FunctionDeclaration = require('./../entities/function_declaration.js');
const BinaryExpression = require('./../entities/binary_expression.js');
const UnaryExpression = require('./../entities/unary_expression.js');
const MemberExpression = require('./../entities/member_expression.js');
const CallExpression = require('./../entities/call_expression.js');
const VariableExpression = require('./../entities/variable_expression.js');
const Binding = require('./../entities/binding.js');
const Params = require('./../entities/params.js');
const Args = require('./../entities/args.js');
const NumLiteral = require('./../entities/num_lit.js');
const BoolLiteral = require('./../entities/bool_lit.js');
const StringLiteral = require('./../entities/str_lit.js');
const Type = require('./../entities/type.js');

/* eslint-disable no-unused-vars */
const semantics = grammar.createSemantics().addOperation('ast', {

  Program: statements => new Program(statements.ast()),
  Block: (statement, _) => new Block(statement.ast()),

  If: (i, ifExp, c, ifBlock, el, il, eiExps, eic, eiBlocks, e, ec, eBlock) =>
    new IfStatement(ifExp.ast(), ifBlock.ast(), eiExps.ast(), eiBlocks.ast(), eBlock.ast()),
  For: (f, id, i, exp, c, block) => new ForStatement(id.sourceString, exp.ast(), block.ast()),
  Return: (r, exp) => new ReturnStatement(exp.ast()),
  Break: b => new BreakStatement(),

  Access_lit: (p, id) => id.ast(),
  Access_exp: (o, exp, c) => exp.ast(),

  Binding: (key, c, value) => new Binding(key.ast(), value.ast()),

  Args_exp: (o, e, cl, el, c) => new Args(e.ast(), el.ast()), // doesnt get first
  Args_named: (o, e, cl, el, c) => new Args(e.ast(), el.ast()),

  FunDecl: (t, id, e, params, c, block) =>
    new FunctionDeclaration(id.sourceString, t.sourceString, params.ast(), block.ast()),
  ObjDecl: (t, id, e, params, c, block) =>
    new TypeDeclaration(id.sourceString, params.ast(), block.ast()),

  Decl_var: (t, id, e, val) => new VariableDeclaration(id.sourceString, t.ast(), val.ast()),

  And_bin: (left, op, right) => new BinaryExpression(left.ast(), op.sourceString, right.ast()),
  Or_bin: (left, op, right) => new BinaryExpression(left.ast(), op.sourceString, right.ast()),
  Rel_bin: (left, op, right) => new BinaryExpression(left.ast(), op.sourceString, right.ast()),
  Term_bin: (left, op, right) => new BinaryExpression(left.ast(), op.sourceString, right.ast()),
  Fact_bin: (left, op, right) => new BinaryExpression(left.ast(), op.sourceString, right.ast()),
  Neg_neg: (op, exp) => new UnaryExpression(op.sourceString, exp.ast()),
  Power_bin: (left, op, right) => new BinaryExpression(left.ast(), op.sourceString, right.ast()),

  Exp2_call: (obj, args) => new CallExpression(obj.ast(), args.ast()),

  Param: (o, p, cl, pl, c) => new Params(p.ast(), pl.ast()),

  SParam_id: (t, id) => new VariableDeclaration(new VariableExpression(id.sourceString), t.ast()),

  Exp2_acc: (obj, prop) => new MemberExpression(obj.ast(), prop.ast()),

  Primary_id: id => new VariableExpression(id.sourceString),
  Primary_num: n => new NumLiteral(n.sourceString),
  Primary_bool: b => new BoolLiteral(b.sourceString),
  Primary_str: s => new StringLiteral(s.sourceString),
  Primary_exp: (o, exp, c) => exp.ast(),

  type: (f, rest) => new Type(`${f.sourceString}${rest.sourceString}`),

});
/* eslint-enable no-unused-vars */

/* eslint-disable quotes */

// Grammar Tests
const positiveTests = [
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
const AST_TESTS = [
  [
    `if true == ryan: return true. else: return false.`,
    `{ Program (If (Case (BinaryExpression Left : BoolLit : true) (Op : ==) (Right : VariableId : ryan)) (IfBlock (Block (Return -> BoolLit : true))))(ElseBlock (Block (Return -> BoolLit : false)))}`,
  ],

  [
    `kevin = 4`,
    `{ Program (VariableID = kevin, Type : , Type : NumLit : 4 )}`,
  ],
];

// Testing Grammar
describe('Grammar', () => {
  for (test in positiveTests) {
    it('matches with programs it should', () => {
          assert.ok(grammar.match(!positiveTests[test]).succeeded());

    });
  }
  for (test in negativeTests) {
    it('rejects invalid programs', () => {
          assert.ok(grammar.match(!negativeTests[test]).succeeded());
    });
  }
});


// Testing AST
describe('AST', () => {
  AST_TESTS.forEach((x) => {
      it('generates an ast for input whiteboard code', () => {
      let match = grammar.match(x[0]);
      assert.equal(semantics(match).ast().toString(), x[1]);
      assert.equal(true, true);
    });
  });

});
