class CallExpressions{
  constructor(callee, args) {
    this.callee = callee;
    this.args = args;
  }

  toString(){
    return `(${this.callee.toString()} ${this.args.toString()})`;
  }
}

module.exports = CallExpressions;
