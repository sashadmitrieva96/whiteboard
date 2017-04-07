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
    this.type = this.callee.type;
    this.args.analyze(context);
    this.checkArguments(this.callee);
  }

  checkArguments(callee) {
    let hasSeenNamed = false;
    const matchedParamNames = new Set([]);
    console.log(this.args);
    this.args.args.forEach((arg, index) => {
      if (arg.id) {
        hasSeenNamed = true;
      } else if (hasSeenNamed) {
        throw Error('positional after named. you dumb');
      }

      if (index >= callee.params.length) {
        throw Error('too many arguments');
      }

      const name = arg.id ? arg.id : callee.params[index].id;
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
