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
  new Type('Math'),
  new Params(),
  new Block([
    new FunctionDeclaration(
      'cos',
      Type.Num,
      Params.newParam([new VariableInitialization('val', Type.Num, null)]),
      new Block([
        new ReturnStatement(new Numlit())
      ])
    ),
    new FunctionDeclaration(
      'sin',
      Type.Num,
      Params.newParam([new VariableInitialization('val', Type.Num, null)]),
      new Block([
        new ReturnStatement(new Numlit())
      ])
    ),
    new FunctionDeclaration(
      'tan',
      Type.Num,
      Params.newParam([new VariableInitialization('val', Type.Num, null)]),
      new Block([
        new ReturnStatement(new Numlit())
      ])
    ),
    new FunctionDeclaration(
      'abs',
      Type.Num,
      Params.newParam([new VariableInitialization('val', Type.Num, null)]),
      new Block([
        new ReturnStatement(new Numlit())
      ])
    ),
    new FunctionDeclaration(
      'floor',
      Type.Num,
      Params.newParam([new VariableInitialization('val', Type.Num, null)]),
      new Block([
        new ReturnStatement(new Numlit())
      ])
    ),
    new FunctionDeclaration(
      'random',
      Type.Num,
      Params.newParam([
        new VariableInitialization('start', Type.Num, null),
        new VariableInitialization('end', Type.Num, null)
      ]),
      new Block([
        new ReturnStatement(new Numlit())
      ])
    )
  ])
);
