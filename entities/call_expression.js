const Rest = require('./rest.js');

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
    // console.log('----', cale);
    this.checkArguments(this.calleeRoot, context);
    this.args.analyze(context, this.calleeRoot.closure); // TODO might not work
    this.type = this.callee.get(context).type;
  }

  getType(entity) {
    return entity.type.type[0];
  }

  checkArguments(callee, context) {
    let hasSeenNamed = false;
    const matchedParamNames = new Set([]);
    this.startingSize = callee.params.params.length;
    // console.log('params: ', this.startingSize);
    this.extraIndices = [];
    this.args.args.forEach((arg, index) => {
      // console.log(arg);
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
        // console.log('IN REST');
        // might not need this??.. def not
        // if (index === this.startingSize) {
          // callee.params.params.push(new Rest());
          // callee.params.paramNames.push('rest');
        // }
        // const rest = callee.params.params[callee.params.params.length - 1];
        
        this.args.rest.addArgument(arg);
        this.extraIndices.push(index);
        // cannot have binding in rest
        if (arg.isBinding) {
          throw Error('Cannot bind values in rest');
        }
        // console.log(arg);

        // throw Error('too many arguments');
      } else {
        // console.log('ARG: ', arg);
        // console.log(callee.params.params[index]);
        name = arg.isBinding ? arg.key : callee.params.params[index].key;
        if (matchedParamNames.has(name)) {
          throw Error(`matched parameter ${name} multiple times.`);
        }
        if (!callee.params.hasName(name)) {
          throw Error(`${name} is not a parameter`);
        }
        arg.paramName = this.getParamWithKey(name, context);
        matchedParamNames.add(name);
      }
    });
    this.args.args = this.args.args.slice(0, this.extraIndices[0]);
  }

  getParamWithKey(key, context) {
    // console.log(key);
    const callee = this.callee.get(context);
    let result = null;
    // console.log(callee.params.params);
    callee.params.params.forEach((p) => {
      if (p.key === key) {
        result = p.name;
      }
    });
    if (result === null) {
      throw new Error('param not found')
    }
    // console.log('FOUND', result);
    return result;
  }

  get() {
    return this;
  }
}

module.exports = CallExpression;
