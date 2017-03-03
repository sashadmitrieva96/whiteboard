semantics = whiteboard.createSemantics().addOperation('ast', {

  Program: (block, _) => { new Program(block.ast()); },
  Block: (statement, _) => { new Block(statement.ast()); },

  IfStatement: (ifExp, ifBlock, eiExps, eiBlocks, eExp, eBlock) => {
    new IfStatement(ifExp.ast(), ifBlock.ast(), eiExps.ast(), eiBlocks.ast(), eExp.ast(), eBlock.ast());
   },
  ForStatement: (id, exp, block) => { new ForStatement(id.sourceString, exp.ast(), block.ast() ); },
  ReturnStatement: (exp) => { new ReturnStatement(exp.ast()); },
  BreakStatement: () => { new BreakStatement(); },

  VariableDeclaration: (id, type, exp) => { new VariableDeclaration(id.sourceString, type.sourceString, exp.ast()); },
  TypeDeclaration: (id, params, body) => { new TypeDeclaration(id.sourceString, params.ast(), body.ast()); },
  FunctionDeclaration: (id, type, params, block) => { new FunctionDeclaration(id.sourceString, type.sourceString, params.ast(), block.ast()); },

  BinaryExpression: (left, op, right) => { new BinaryExpression(left.ast(), op.sourceString, right.ast()); },
  UnaryExpression: (op, exp) => { new UnaryExpression(op.sourceString, exp.ast()); }
  // Whiteboard doesn't have negative numbers ++ or any unary operators ++ negation
  // Programs should be Block* instead of Statement* *******
  // Binary Exp should be op instead of exp?



})
