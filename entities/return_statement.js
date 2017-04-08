class ReturnStatement {
  constructor(exp) {
    this.exp = exp;
  }

  toString() {
    return `(Return -> ${this.exp.toString()})`;
  }

  analyze(context) {
    context.assertInFunction('Return statement is not in function');
    this.exp.analyze(context);
    this.type = this.exp.type;
    // console.log(context);
    // console.log();
    this.type.assertTypeCompatability([context.getType()], `return type ${this.type} does not match function type ${context.type}`);
    /* eslint-disable */
    context.type = this.type;
    /* eslint-enable */
    this.isReturn = true;
  }
}

module.exports = ReturnStatement;
