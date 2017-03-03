const fs = require('fs');
const ohm = require('ohm-js');
const language = fs.readFileSync('whiteboard.ohm');
const grammar = ohm.grammar(language);

const semantics = grammar.createSemantics().addOperation('ast', {

  Program: (statements, _) => { new Program(statements.ast()); },
  Block: (statement, _) => { new Block(statement.ast()); },

  Statement_if: (ifExp, ifBlock, eiExps, eiBlocks, eExp, eBlock) => {
    new IfStatement(ifExp.ast(), ifBlock.ast(), eiExps.ast(), eiBlocks.ast(), eExp.ast(), eBlock.ast());
  },
  Statement_for: (id, exp, block) => { new ForStatement(id.sourceString, exp.ast(), block.ast()); },
  Statement_ret: (exp) => { new ReturnStatement(exp.ast()); },
  Statement_break: () => { new BreakStatement(); },

  Access_lit: (p, id) => id.ast(),
  Access_exp: (o, exp, c) => exp.ast(),

  Dict: (key, value) => new DictExpression(key.ast(), value.ast()),

  Args_exp: (o, e, cl, el, c) => new Args(el.unshift(e).map((e) => e.ast())),
  Args_named: (o, e, cl, el, c) => new Args(el.unshift(e).map((e) => e.ast())),

  Decl_fun: (type, id, e, params, c, block) => { new FunctionDeclaration(id.sourceString, type.sourceString, params.ast(), block.ast()); },                                                        //THIS PROBABLY DOESNT WORK BUT FUCKIT
  Decl_obj: (t, id, e, params, c, block) => new TypeDeclaration(id.sourceString, params.ast(), block.ast()),
  Decl_var: (type, target, e, val) => new VariableDeclaration(id.sourceString, type.ast(), e.ast()),

  And_bin: (left, op, right) => new BinaryExpression(left.ast(), op.sourceString, right.ast()),
  Or_bin: (left, op, right) => new BinaryExpression(left.ast(), op.sourceString, right.ast()),
  Rel_bin: (left, op, right) => new BinaryExpression(left.ast(), op.sourceString, right.ast()),
  Term_bin: (left, op, right) => new BinaryExpression(left.ast(), op.sourceString, right.ast()),
  Fact_bin: (left, op, right) => new BinaryExpression(left.ast(), op.sourceString, right.ast()),
  Neg_neg: (op, exp) => new UnaryExpression(op.sourceString, exp.ast()),
  Power_bin: (left, op, right) => new BinaryExpression(left.ast(), op.sourceString, right.ast()),

  Exp2_call: (obj, args) => new MemberExpression(obj.ast(), prop.ast()),


  Exp2_acc: (obj, prop) => new MemberExpression(obj.ast(), prop.ast()),

  Primary_id: (id) => new VariableExpression(id),
  Primary_num: (n) =>  new num_lit(n.sourceString),
  Primary_bool: (b) => new bool_lit(b.sourceString),
  Primary_str: (s) => new str_lit(s.sourceString),


  Declaration: (id, type, exp) => { new VariableDeclaration(id.sourceString, type.sourceString, exp.ast()); },
  TypeDeclaration: (id, params, body) => { new TypeDeclaration(id.sourceString, params.ast(), body.ast()); },
  FunctionDeclaration: (id, type, params, block) => { new FunctionDeclaration(id.sourceString, type.sourceString, params.ast(), block.ast()); },

  BinaryExpression: (left, op, right) => { new BinaryExpression(left.ast(), op.sourceString, right.ast()); },
  UnaryExpression: (op, exp) => { new UnaryExpression(op.sourceString, exp.ast()); },
  // Whiteboard doesn't have negative numbers ++ or any unary operators ++ negation
  // Binary Exp should be op instead of exp?

});

const match = grammar.match(process.argv[2]);
if (match.succeeded()) {
  console.log('success');
} else {
  console.error('error');
  process.exitCode = 1;
}
