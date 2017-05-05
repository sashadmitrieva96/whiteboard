// const Rest = require('./rest.js');

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
    this.calleeRoot = this.callee.get(context);
    this.args.analyze(context, this.calleeRoot.closure);
    this.checkArguments(this.calleeRoot, context);
    this.type = this.callee.get(context).type;
  }

  getType(entity) {
    return entity.type;
  }

  resultType(context) {
    if (this.callee.get(context).type.type === 'Function' || this.callee.get(context).type.type === 'Type') {
      return this.callee.get(context).type.subType
    }
    return this.callee.get(context).type;
  }

  checkArguments(callee, context) {
    let hasSeenNamed = false;
    const matchedParamNames = new Set([]);
    this.startingSize = callee.params.params.length;
    this.extraIndices = [];
    this.args.args.forEach((arg, index) => {
      let name;
      if (arg.isBinding) {
        hasSeenNamed = true;
      } else if (hasSeenNamed) {
        throw Error('positional after named. you dumb');
      }

      if (index >= this.startingSize) {
        if (!callee.params.hasRest) {
          throw Error('callee is not rest capable, too many args');
        }

        this.args.rest.addArgument(arg);
        this.extraIndices.push(index);
        // cannot have binding in rest
        if (arg.isBinding) {
          throw Error('Cannot bind values in rest');
        }
      } else {
        name = arg.isBinding ? arg.key : callee.params.params[index].key;
        if (matchedParamNames.has(name)) {
          throw Error(`matched parameter ${name} multiple times.`);
        }
        if (!callee.params.hasName(name)) {
          throw Error(`${name} is not a parameter`);
        }

        callee.params.getParamBykey(name).type.assertTypeCompatability(arg.type);


        arg.paramName = this.getParamWithKey(name, context);
        matchedParamNames.add(name);
      }
    });
    this.args.args = this.args.args.slice(0, this.extraIndices[0]);
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
      throw new Error('param not found');
    }
    return result;
  }

  get() {
    return this;
  }

  optimize() {
    this.callee.optimize();
    this.args.optimize();
    return this;
  }
}

module.exports = CallExpression;
