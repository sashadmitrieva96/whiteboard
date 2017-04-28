const Context = require('./../context.js');
const Type = require('./../type.js');

const TypeDeclaration = require('./../type_declaration.js');
const FunctionDeclaration = require('./../function_declaration.js');
const Params = require('./../params.js');
const Block = require('./../block.js');
const ReturnStatement = require('./../return_statement.js');
const Numlit = require('./../num_lit.js');
const VariableInitialization = require('./../variable_initialization.js');
const CallExpression = require('./../call_expression.js');
const Args = require('./../args.js');
const StringLiteral = require('./../str_lit');
const VariableExpression = require('./../variable_expression.js')

const INITIAL = new Context(null, false, false, false, 0);

const STR = 'Str';
const NUM = 'Num';
const BOOL = 'Bool';

const Str = new TypeDeclaration(
  STR,
  new Params(),
  new Block([
    new FunctionDeclaration(
      'length',
      NUM,
      new Params(),
      new Block([new ReturnStatement(new Numlit('0'))])
    ),
    new FunctionDeclaration(
      'substring',
      STR,
      Params.newParam([
        new VariableInitialization('start', NUM, null),
        new VariableInitialization('end', NUM, null)
      ]),
      new Block([new ReturnStatement(new StringLiteral(''))])
    )
  ])
);


const PRINT = new FunctionDeclaration(
  'print',
  '',
  new Params([new VariableInitialization('test', STR, null)]),
  new Block([])
);

// INITIAL.addVariable('Str', Str);
INITIAL.addVariable('Bool', new Type('Bool'));
INITIAL.addVariable('Num', new Type('Num'));
Str.analyze(INITIAL);

PRINT.analyze(INITIAL);

module.exports = INITIAL;
