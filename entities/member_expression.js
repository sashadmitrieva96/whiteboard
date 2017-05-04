const VariableExpression = require('./variable_expression.js');
const Type = require('./type.js');

class MemberExpression {
  constructor(object, property) {
    this.object = object;
    this.property = property;
    if (typeof property === 'string') {
      this.isLiteral = true;
      this.property = new VariableExpression(this.property);
    } else {
      this.isLiteral = false;
    }
  }

  toString() {
    return `(MemberObject : ${this.object.toString()} . MemberProperty : ${this.property.toString()})`;
  }

  analyze(context) {
    // console.log('please god', this.object);
    this.object.analyze(context);

    if (this.isLiteral) {
      // const propClosure = context.lookup(this.getType(this.object.get(context))).closure;
      // console.log('ME0: ', this.object.type);
      // console.log('ME1: ', this.object.get(context).calleeRoot.key);
      // console.log('ME2: ', this.object.type);
      // console.log('ME3: ', this.object);
      // console.log('ME4: ', this.getType(this.object.get(context)));
      let propClosure = context.lookup(this.getType(this.object.get(context))).closure;

      if (this.object.get(context).isType) {
        // console.log(this.object.get(context));
        propClosure = this.object.get(context).closure;
      }
      // console.log(propClosure);
      // console.log(this.property);
      // console.log('ME5: ');
      // console.log('ME2: ', this.property);
      // console.log('ME3: ', propClosure);
      this.property.analyze(propClosure);
      this.type = this.property.type;
    }
  }

  getType(entity) {
    // console.log('GET_TYPE: ', entity.type);
    // console.log('_-_-_-_-_', require('util').inspect(entity, {depth: 5}));
    if (entity.type.type === Type.Function.type || entity.type.type === Type.Type.type) {
      // console.log('was fun');
      return entity.type.subType.type;
    }
    return entity.type.type;
  }

  get(context) {
    // console.log('get0: ', this.object.get(context));
    let result = this.object.get(context);
    if (result.callee) {
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      // console.log('get1: ', context.lookup(result.type.type));
      // console.log('get2: ', this.property);
      return context.lookup(result.type.type).closure.lookup(this.property.key);
    }
    if (this.object.get(context).isType) {
      console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
      return this.object.get(context).closure.lookup(this.property.key);
    }
    console.log('+++++++++++++++++++++++++++++++');
    console.log(this.getType(result))
    result = this.getType(result);
    console.log(context.lookup(result).closure.lookup(this.property.key));
    result = context.lookup(result).closure;
    return result.lookup(this.property.key)

    // return this.property.get(
    //   context.lookup(
    //     this.getType(this.object.get(context).type)
    //   ).closure.lookup(this.property.key)
    // );
    // return context.lookup(this.getType(this.object.get(context))).closure.lookup(this.property.key);
  }


}

module.exports = MemberExpression;
