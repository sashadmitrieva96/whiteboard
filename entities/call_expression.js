class CallExpressions{
  constructor(callee, args) {
    this.callee = callee;
    this.args = args;
  }

  toString(){
    return `CalleeID : ${this.callee.toString()}, Args : ${this.args.toString()}`;
  }
}

module.exports = CallExpressions;
