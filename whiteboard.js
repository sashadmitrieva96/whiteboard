const fs = require('fs');
const ohm = require('ohm-js');
const language = fs.readFileSync('whiteboard.ohm');
const grammar = ohm.grammar(language);

const Program = require('./entities/program.js');
const Block = require('./entities/block.js');
const IfStatement = require('./entities/if_statement.js');
const ForStatement = require('./entities/for_statement.js');
const ReturnStatement = require('./entities/return_statement.js');
const BreakStatement = require('./entities/break.js');
const VariableDeclaration = require('./entities/variable_declaration.js');
const TypeDeclaration = require('./entities/type_declaration.js');
const FunctionDeclaration = require('./entities/function_declaration.js');
const BinaryExpression = require('./entities/binary_expression.js');
const UnaryExpression = require('./entities/unary_expression.js');
const MemberExpression = require('./entities/member_expression.js');
const CallExpression = require('./entities/call_expression.js');
const VariableExpression = require('./entities/variable_expression.js')
const Params = require('./entities/params.js');
const Args = require('./entities/args.js');
const numlit = require('./entities/num_lit.js');
const boollit = require('./entities/bool_lit.js');
const strlit = require('./entities/str_lit.js');
const type = require('./entities/type.js')

const semantics = grammar.createSemantics().addOperation('ast', {

  Program: (statements) => new Program(statements.ast()),
  Block: (statement, _) => new Block(statement.ast()),

  If: (i, ifExp, c, ifBlock, el, il, eiExps, eic, eiBlocks, e, ec, eBlock) =>
    new IfStatement(ifExp.ast(), ifBlock.ast(), eiExps.ast(), eiBlocks.ast(), eBlock.ast()),
  For: (f, id, i, exp, c, block) =>  new ForStatement(id.sourceString, exp.ast(), block.ast()),
  Return: (r, exp) => new ReturnStatement(exp.ast()),
  Break: (b) => new BreakStatement(),

  Access_lit: (p, id) => id.ast(),
  Access_exp: (o, exp, c) => exp.ast(),

  Dict: (key, c, value) => new DictExpression(key.ast(), value.ast()),

  Args_exp: (o, e, cl, el, c) => new Args(el.unshift(e).ast()),
  Args_named: (o, e, cl, el, c) => new Args(el.unshift(e).ast()),

  FunDecl: (t, id, e, params, c, block) => new FunctionDeclaration(id.sourceString, t.sourceString, params.ast(), block.ast()),                                                        //THIS PROBABLY DOESNT WORK BUT FUCKIT
  ObjDecl: (t, id, e, params, c, block) => new TypeDeclaration(id.sourceString, params.ast(), block.ast()),

  Decl_var: (t, id, e, val) => new VariableDeclaration(id.sourceString, t.ast(), val.ast()),

  And_bin: (left, op, right) => new BinaryExpression(left.ast(), op.sourceString, right.ast()),
  Or_bin: (left, op, right) => new BinaryExpression(left.ast(), op.sourceString, right.ast()),
  Rel_bin: (left, op, right) => new BinaryExpression(left.ast(), op.sourceString, right.ast()),
  Term_bin: (left, op, right) => new BinaryExpression(left.ast(), op.sourceString, right.ast()),
  Fact_bin: (left, op, right) => new BinaryExpression(left.ast(), op.sourceString, right.ast()),
  Neg_neg: (op, exp) => new UnaryExpression(op.sourceString, exp.ast()),
  Power_bin: (left, op, right) => new BinaryExpression(left.ast(), op.sourceString, right.ast()),

  Exp2_call: (obj, args) => new CallExpression(obj.ast(), args.ast()),

  Param: (o, p, cl, pl, c) => new Params(pl.unshift(p)),

  SParam_id: (t, id) => new VariableDeclaration(id, t),

  Exp2_acc: (obj, prop) => new MemberExpression(obj.ast(), prop.ast()),

  Primary_id: (id) => new VariableExpression(id.sourceString),
  Primary_num: (n) =>  new numlit(n.sourceString),
  Primary_bool: (b) => new boollit(b.sourceString),
  Primary_str: (s) => new strlit(s.sourceString),

  type: (f, rest) => new type(`${f.sourceString}${rest.sourceString}`)


  // Whiteboard doesn't have negative numbers ++ or any unary operators ++ negation
  // Binary Exp should be op instead of exp?

});

const match = grammar.match(process.argv[2]);
if (match.succeeded()) {
  console.log(semantics(match).ast().toString());
} else {
  console.error(match.message);
  console.log("fail");
  process.exitCode = 1;
}
