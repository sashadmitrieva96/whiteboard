
const fs = require('fs');
const ohm = require('ohm-js');

const language = fs.readFileSync('whiteboard.ohm');
const grammar = ohm.grammar(language);

const preparse = require('./preparser.js');

const Program = require('./entities/program.js');
const Block = require('./entities/block.js');
const IfStatement = require('./entities/if_statement.js');
const ForStatement = require('./entities/for_statement.js');
const WhileStatement = require('./entities/while_statement.js');
const ReturnStatement = require('./entities/return_statement.js');
const BreakStatement = require('./entities/break.js');
const VariableInitialization = require('./entities/variable_initialization.js');
const TypeDeclaration = require('./entities/type_declaration.js');
const FunctionDeclaration = require('./entities/function_declaration.js');
const BinaryExpression = require('./entities/binary_expression.js');
const UnaryExpression = require('./entities/unary_expression.js');
const MemberExpression = require('./entities/member_expression.js');
const CallExpression = require('./entities/call_expression.js');
const VariableExpression = require('./entities/variable_expression.js');
const Binding = require('./entities/binding.js');
const Params = require('./entities/params.js');
const Args = require('./entities/args.js');
const NumLiteral = require('./entities/num_lit.js');
const BoolLiteral = require('./entities/bool_lit.js');
const StringLiteral = require('./entities/str_lit.js');
const Type = require('./entities/type.js');
const Operand = require('./entities/operand.js');
const VariableAssignment = require('./entities/variable_assignment.js');

require('./backend/javascript-generator.js');


const unpack = (a => (a.length === 0 ? null : a[0]));

/* eslint-disable no-unused-vars */
const semantics = grammar.createSemantics().addOperation('ast', {

  Program: statements => new Program(statements.ast()),
  Block: (i, statement, d) => new Block(statement.ast()),

  If: (i, ifExp, c, ifBlock, el, il, eiExps, eic, eiBlocks, e, ec, eBlock) =>
    new IfStatement(ifExp.ast(), ifBlock.ast(), eiExps.ast(), eiBlocks.ast(), unpack(eBlock.ast())),
  For: (f, id, i, exp, c, block) => new ForStatement(id.sourceString, exp.ast(), block.ast()),
  While: (w, exp, c, block) => new WhileStatement(exp.ast(), block.ast()),
  Return: (r, exp) => new ReturnStatement(unpack(exp.ast())),
  Break: b => new BreakStatement(),

  Access_lit: (p, id) => id.sourceString,
  Access_exp: (o, exp, c) => exp.ast(),

  Binding: (key, c, value) => new Binding(key.sourceString, value.ast()), // CHANGE NULL

  Args: (o, e, cl, el, c) => new Args(unpack(e.ast()), unpack(el.ast())), // doesnt get first

  ObjDecl: (t, id, e, params, c, block) => new TypeDeclaration(id.sourceString, params.ast(), block.ast()),
  FunDecl: (t, id, e, params, c, block) =>
    new FunctionDeclaration(id.sourceString, t.sourceString, params.ast(), block.ast()),

  Decl_ass: (id, e, val) => new VariableAssignment(id.sourceString, val.ast()),
  Decl_init: (t, id, e, val) => new VariableInitialization(id.sourceString, t.sourceString, unpack(val.ast())),

  And_bin: (left, op, right) => new BinaryExpression(left.ast(), new Operand(op.sourceString), right.ast()),
  Or_bin: (left, op, right) => new BinaryExpression(left.ast(), new Operand(op.sourceString), right.ast()),
  Rel_bin: (left, op, right) => new BinaryExpression(left.ast(), new Operand(op.sourceString), right.ast()),
  Term_bin: (left, op, right) => new BinaryExpression(left.ast(), new Operand(op.sourceString), right.ast()),
  Fact_bin: (left, op, right) => new BinaryExpression(left.ast(), new Operand(op.sourceString), right.ast()),
  Neg_neg: (op, exp) => new UnaryExpression(new Operand(op.sourceString), exp.ast()),
  Power_bin: (left, op, right) => new BinaryExpression(left.ast(), new Operand(op.sourceString), right.ast()),

  Exp2_call: (obj, args) => new CallExpression(obj.ast(), args.ast()),

  Param: (o, p, cl, pl, clos) => new Params(unpack(p.ast()), unpack(pl.ast())),

  SParam_id: (t, id) => new VariableInitialization(id.sourceString, t.sourceString, null),

  Exp2_acc: (obj, prop) => new MemberExpression(obj.ast(), prop.ast()),

  Primary_id: id => new VariableExpression(id.sourceString),
  Primary_num: n => new NumLiteral(n.sourceString),
  Primary_bool: b => new BoolLiteral(b.sourceString),
  Primary_str: s => new StringLiteral(s.sourceString),
  Primary_exp: (o, exp, c) => exp.ast(),

  type: (name, p2) => new Type(name.sourceString, p2.sourceString),

});
/* eslint-enable no-unused-vars */

/* I put this part in the export so we didn't have to have a giant copy of
   the parser in the test file, but we'll keep this here just in case. */

const m = grammar.match(process.argv[2]);
if (m.succeeded()) {
  const ast = semantics(m).ast();
  ast.analyze();
  ast.gen();
  // console.log(semantics(m).ast().analyze());
} else {
  console.error(m.message);
  console.log('fail');
  process.exitCode = 1;
}

module.exports = (program) => {
  const match = grammar.match(preparse(program));
  if (!match.succeeded()) {
    throw new Error('lol thats an error bro');
  }
  return semantics(match).ast();
};
