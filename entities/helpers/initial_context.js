const Context = require('./../context.js');
const Type = require('./../type.js');

const TypeDeclaration = require('./../type_declaration.js');
const FunctionDeclaration = require('./../function_declaration.js');
const Params = require('./../params.js');
const Block = require('./../block.js');
const ReturnStatement = require('./../return_statement.js');
const Numlit = require('./../num_lit.js');
const VariableInitialization = require('./../variable_initialization.js');
const Binding = require('./../binding.js')
const CallExpression = require('./../call_expression.js');
const Args = require('./../args.js');
const StringLiteral = require('./../str_lit');
const VariableExpression = require('./../variable_expression.js')

const INITIAL = new Context(null, false, false, false, 0);

const Str = new TypeDeclaration(
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
    )
  ])
);

const MATH = new TypeDeclaration(
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

const LIST = new TypeDeclaration(
  Type.List,
  new Params(/*[new VariableInitialization('Type', Type.Type, null)]*/undefined, undefined, true),
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

const RANGE = new FunctionDeclaration(
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

const PRINT = new FunctionDeclaration(
  'print',
  Type.None,
  new Params([new VariableInitialization('val', Type.Str, null)]),
  new Block([new ReturnStatement(new VariableInitialization('res', Type.None, null))])
);

INITIAL.addVariable('Type', Type.Type);
INITIAL.addVariable('Bool', Type.Bool);
INITIAL.addVariable('Num', Type.Num);

INITIAL.addVariable('Function', Type.Function);
INITIAL.addVariable('None', Type.None);
INITIAL.addVariable('<arbitrary>', Type.Arbritrary);

Str.analyze(INITIAL);
MATH.analyze(INITIAL);
LIST.analyze(INITIAL);

RANGE.analyze(INITIAL);
PRINT.analyze(INITIAL);

module.exports = INITIAL;
