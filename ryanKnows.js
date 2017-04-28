const Math = new TypeDeclaration(
    'Math',
    new Params(),
    new Block([
      new FunctionDeclaration(
          'square',
          NUM,
          new Params(new VariableInitialization('square', new Numlit('2'), null)),
          new Block([
              new ReturnStatement(new Numlit())
          ])
      ),

      new FunctionDeclaration(
          'power',
          NUM,
          new Params(new VariableInitialization('power', new Numlit(), null)),
          new Block([
              new ReturnStatement(new Numlit())
          ])
      ),

      new FunctionDeclaration(
        'sqrt'
        NUM,
        new Params(new VariableInitialization('root' new Numlit(2), null)),
        new Block([
          new ReturnStatement(new Numlit());
        ])
      ),

      new FunctionDeclaration(
        'root'
        NUM,
        new Params(new VariableInitialization('root', new Numlit(), null)),
        new Block([
          new ReturnStatement(new Numlit());
        ])
      ),

      new FunctionDeclaration(
        'cos'
        NUM,
        new Params(new VariableInitialization('cos', new Numlit(), null)),
        new Block([
          new ReturnStatement(new Numlit());
        ])
      ),

      new FunctionDeclaration(
        'sin'
        NUM,
        new Params(new VariableInitialization('sin', new Numlit(), null)),
        new Block([
          new ReturnStatement(new Numlit());
        ])
      ),

      new FunctionDeclaration(
        'tan'
        NUM,
        new Params(new VariableInitialization('tan', new Numlit(), null)),
        new Block([
          new ReturnStatement(new Numlit());
        ])
      ),

      new FunctionDeclaration(
        'abs'
        NUM,
        new Params(new VariableInitialization('absolute', new Numlit(), null)),
        new Block([
          new ReturnStatement(new Numlit());
        ])
      ),

      new FunctionDeclaration(
        'floor'
        NUM,
        new Params(new VariableInitialization('roundDown', new Numlit(), null)),
        new Block([
          new ReturnStatement(new Numlit());
        ])
      ),

      new FunctionDeclaration(
        'max'
        NUM,
        new Params(new VariableInitialization('max', new Numlit(), null)),
        new Block([
          new ReturnStatement(new Numlit());
        ])
      )
  ])
);
/* Hey ryan I am doing the add function for lists and don't get how to know the
return value like for math its always NUM but for lists you can put anything
into a list so what do?
*/
const lists = new TypeDeclaration(
  'list',
  new Params(new VariableInitialization()),
  new Block([
    new FunctionDeclaration(
      'add',
      '',
      new Params(new VariableInitilization('object', '', null)),
      new Block([
        new ReturnStatement(new list with added element);
      ])
    ),

    new FunctionDeclaration(
      'get',
      '',
      new Params(),
      new Block([
        new ReturnStatement(new VariableInitilization('object', '', null));
      ])
    ),

    new FunctionDeclaration(
      'length',
      NUM,
      new Params(),
      new Block([
        new ReturnStatement(new Numlit());
      ])
    ),

    new FunctionDeclaration(
      'contains',
      BOOL,
      new Params(new VariableInitilization('object', '', null)),
      new Block([
        new ReturnStatement(new BOOL);
      ])
    )
  ])
);
