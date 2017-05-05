const Context = require('./../entities/context.js');
const Type = require('./../entities/type.js');

const String = require('./initial_context/types/string.js');
const Math = require('./initial_context/types/math.js');
const List = require('./initial_context/types/list.js');
const range = require('./initial_context/functions/range.js');
const print = require('./initial_context/functions/print.js');

const createInitial = () => {

  const INITIAL = new Context(null, false, false, false, 0);


  INITIAL.addVariable('Type', Type.Type);
  INITIAL.addVariable('Bool', Type.Bool);
  INITIAL.addVariable('Num', Type.Num);

  INITIAL.addVariable('Function', Type.Function);
  INITIAL.addVariable('None', Type.None);
  INITIAL.addVariable('<arbitrary>', Type.Arbritrary);

  List.analyze(INITIAL);
  String.analyze(INITIAL);
  Math.analyze(INITIAL);

  range.analyze(INITIAL);
  print.analyze(INITIAL);
  return INITIAL;
}

module.exports = createInitial;
