class CallExpressions{
  constructor(callee, args) {
    this.callee = callee;
    this.args = args;
  }

  ToString(){
    return `(${this.callee} ${this.args})`;
  }
}

module.exports = VariableDeclaration;
