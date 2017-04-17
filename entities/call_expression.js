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
    console.log('=======', this.callee);
    this.callee = this.callee.get(context);
    console.log('=======', this.callee);
    this.checkArguments(this.callee);
    this.args.analyze(context);
    this.type = this.callee.type;
  }

  checkArguments(callee) {
    let hasSeenNamed = false;
    const matchedParamNames = new Set([]);
    this.args.args.forEach((arg, index) => {
      // console.log('############', arg);
      if (arg.isBinding) {
        hasSeenNamed = true;
      } else if (hasSeenNamed) {
        throw Error('positional after named. you dumb');
      }

      if (index >= callee.params.length) {
        throw Error('too many arguments');
      }
      // console.log('callee params: ', callee.params.params);
      const name = arg.isBinding ? arg.key : callee.params.params[index].key;
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

  get(context) {
    return this;
  }
}

module.exports = CallExpressions;
