const Type = require('./../../../entities/type.js');

const TypeDeclaration = require('./../../../entities/type_declaration.js');
const FunctionDeclaration = require('./../../../entities/function_declaration.js');
const Params = require('./../../../entities/params.js');
const Block = require('./../../../entities/block.js');
const ReturnStatement = require('./../../../entities/return_statement.js');
const Numlit = require('./../../../entities/num_lit.js');
const VariableInitialization = require('./../../../entities/variable_initialization.js');

/* eslint-disable comma-dangle*/
module.exports = new TypeDeclaration(
  Type.List,
  new Params(undefined, undefined, true),
  new Block([
    new FunctionDeclaration(
      'get',
      Type.Arbritrary,
      Params.newParam([new VariableInitialization('index', Type.Num, null)]),
      new Block([
        new ReturnStatement(new Numlit())
      ])
    ),
    new FunctionDeclaration(
      'length',
      Type.Num,
      new Params(),
      new Block([new ReturnStatement(new Numlit('0'))])
    ),
    new FunctionDeclaration(
      'insert',
      new Type('List', Type.Arbritrary),
      Params.newParam([
        new VariableInitialization('index', Type.Num, null), // actually NUM
        new VariableInitialization('value', Type.Arbritrary, null), // shouldnt be NUM
      ]),
      new Block([
        new ReturnStatement(new VariableInitialization('res', new Type('List', Type.Arbritrary), null))
      ])
    ),
    new FunctionDeclaration(
      'push',
      Type.None,
      Params.newParam([
        new VariableInitialization('value', Type.Arbritrary, null), // shouldnt be NUM
      ]),
      new Block([
        new ReturnStatement(new VariableInitialization('res', Type.None, null))
      ])
    ),
    new FunctionDeclaration(
      'pop',
      Type.Arbritrary,
      Params.newParam([
      ]),
      new Block([
        new ReturnStatement(new VariableInitialization('res', Type.Arbritrary, null))
      ])
    )
  ])
);
