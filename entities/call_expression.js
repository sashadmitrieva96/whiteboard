const util = require('util');

class CallExpressions {
  constructor(callee, args) {
    this.callee = callee;
    this.args = args;
  }

  toString() {
    return `CalleeID : ${this.callee.toString()}, Args : ${this.args.toString()}`;
  }

  analyze(context) {
    this.callee.analyze(context);
    this.callee = this.callee.get(context);
    this.checkArguments(this.callee);
    this.args.analyze(context);
    this.type = this.callee.type;
  }

  checkArguments(callee) {
    let hasSeenNamed = false;
    const matchedParamNames = new Set([]);
    this.args.args.forEach((arg, index) => {
      if (arg.isBinding) {
        hasSeenNamed = true;
      } else if (hasSeenNamed) {
        throw Error('positional after named. you dumb');
      }

      if (index >= callee.params.length) {
        throw Error('too many arguments');
      }
      const name = arg.isBinding ? arg.key : callee.params.params[index].key;
      if (matchedParamNames.has(name)) {
        throw Error(`matched parameter ${name} multiple times.`);
      }
      if (!callee.params.hasName(name)) {
        throw Error(`${name} is not a parameter`);
      }
      matchedParamNames.add(name);
    });
  }

  get(context) {
    return this;
  }
}

module.exports = CallExpressions;
