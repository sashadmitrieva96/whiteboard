class CallExpression {
  constructor(callee, args) {
    this.callee = callee;
    this.args = args;
  }

  toString() {
    return `CalleeID : ${this.callee.toString()}, Args : ${this.args.toString()}`;
  }

  analyze(context) {
    this.callee.analyze(context);
    // console.log(this.callee.get(context));
    let cale = this.callee.get(context);
    if (cale.isFunction) {
      cale = this.callee.get(context);
    } else {
      cale = context.lookup(this.getType(this.callee.get(context)));
    }
    // console.log('__', this.callee.get(context));
    this.calleeRoot = this.callee.get(context);
    // console.log('----', cale);
    this.checkArguments(this.callee.get(context), context);
    this.args.analyze(context, this.callee.get(context).closure); // TODO might not work
    this.type = this.callee.get(context).type;
  }

  getType(entity) {
    return entity.type.type[0];
  }

  checkArguments(callee, context) {
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
      arg.paramName = this.getParamWithKey(name, context);
      matchedParamNames.add(name);
    });
  }

  getParamWithKey(key, context) {
    const callee = this.callee.get(context);
    let result = null;
    callee.params.params.forEach((p) => {
      if (p.key === key) {
        result = p.name;
      }
    });
    if (result === null) {
      throw new Error('param not found')
    }
    return result;
  }

  get() {
    return this;
  }
}

module.exports = CallExpression;
