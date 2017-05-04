const Type = require('./../../../entities/type.js');

const FunctionDeclaration = require('./../../../entities/function_declaration.js');
const Params = require('./../../../entities/params.js');
const Block = require('./../../../entities/block.js');
const ReturnStatement = require('./../../../entities/return_statement.js');
const Numlit = require('./../../../entities/num_lit.js');
const VariableInitialization = require('./../../../entities/variable_initialization.js');
const Binding = require('./../../../entities/binding.js');

/* eslint-disable comma-dangle*/

module.exports = new FunctionDeclaration(
  'range',
  new Type('List', Type.Num),
  Params.newParam([
    new Binding('start', new Numlit('0')), // actually NUM
    new VariableInitialization('end', Type.Num, null), // shouldnt be NUM
  ]),
  new Block([
    new ReturnStatement(new VariableInitialization('res', new Type('List', Type.Num), null))
  ])
);
