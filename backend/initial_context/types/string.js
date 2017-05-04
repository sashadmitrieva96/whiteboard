const Type = require('./../../../entities/type.js');

const TypeDeclaration = require('./../../../entities/type_declaration.js');
const FunctionDeclaration = require('./../../../entities/function_declaration.js');
const Params = require('./../../../entities/params.js');
const Block = require('./../../../entities/block.js');
const ReturnStatement = require('./../../../entities/return_statement.js');
const Numlit = require('./../../../entities/num_lit.js');
const VariableInitialization = require('./../../../entities/variable_initialization.js');
const StringLiteral = require('./../../../entities/str_lit.js');

/* eslint-disable comma-dangle*/
module.exports = new TypeDeclaration(
  Type.Str,
  new Params(),
  new Block([
    new FunctionDeclaration(
      'length',
      Type.Num,
      new Params(),
      new Block([new ReturnStatement(new Numlit('0'))])
    ),
    new FunctionDeclaration(
      'substring',
      Type.Str,
      Params.newParam([
        new VariableInitialization('start', Type.Num, null),
        new VariableInitialization('end', Type.Num, null)
      ]),
      new Block([new ReturnStatement(new StringLiteral(''))])
    ),
    new FunctionDeclaration(
      'index_of',
      Type.Num,
      Params.newParam([
        new VariableInitialization('index', Type.Str, null)
      ]),
      new Block([new ReturnStatement(new Numlit('0'))])
    ),
    new FunctionDeclaration(
      'char_at',
      Type.Str,
      Params.newParam([
        new VariableInitialization('index', Type.Num, null)
      ]),
      new Block([new ReturnStatement(new StringLiteral(''))])
    ),
    new FunctionDeclaration(
      'split',
      new Type('List', Type.Str),
      Params.newParam([
        new VariableInitialization('on', Type.Num, null)
      ]),
      new Block([new ReturnStatement(new VariableInitialization('res', new Type('List', Type.Str), null))])
    )
  ])
);
