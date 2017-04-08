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
    if (this.callee.get) {
      this.callee = this.callee.get(context);
    }
    this.type = this.callee.type;
    this.args.analyze(context);
    this.checkArguments(this.callee);
  }

  checkArguments(callee) {
    let hasSeenNamed = false;
    const matchedParamNames = new Set([]);
    // console.log("*****#***" + util.inspect(this.callee, { depth: null}));
    this.args.args.forEach((arg, index) => {
      // console.log(arg);
      // console.log(index);
      if (arg.id) {
        hasSeenNamed = true;
      } else if (hasSeenNamed) {
        throw Error('positional after named. you dumb');
      }

      if (index >= callee.params.length) {
        throw Error('too many arguments');
      }
      // console.log('callee params: ', callee.params.params);
      const name = arg.id ? arg.id.id : callee.params.params[index].id.id;
      // console.log('name  ', name);
      if (matchedParamNames.has(name)) {
        throw Error(`matched parameter ${name} multiple times.`);
      }
      if (!callee.params.hasName(name)) {
        throw Error(`${name} is not a parameter`);
      }
      matchedParamNames.add(name);
    });
  }
}

module.exports = CallExpressions;
