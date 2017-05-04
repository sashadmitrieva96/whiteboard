const Type = require('./../../../entities/type.js');

const FunctionDeclaration = require('./../../../entities/function_declaration.js');
const Params = require('./../../../entities/params.js');
const Block = require('./../../../entities/block.js');
const ReturnStatement = require('./../../../entities/return_statement.js');
const VariableInitialization = require('./../../../entities/variable_initialization.js');

/* eslint-disable comma-dangle*/
module.exports = new FunctionDeclaration(
  'print',
  Type.None,
  new Params([new VariableInitialization('val', Type.Arbritrary, null)]),
  new Block([new ReturnStatement(new VariableInitialization('res', Type.None, null))])
);
