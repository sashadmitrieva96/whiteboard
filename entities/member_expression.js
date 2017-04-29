const VariableExpression = require('./variable_expression.js');

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
    this.object.analyze(context);

    if (this.isLiteral) {
      // const propClosure = context.lookup(this.getType(this.object.get(context))).closure;
      const propClosure = context.lookup(this.getType(this.object.get(context)).type).closure;
      // console.log('__', propClosure);
      this.property.analyze(propClosure);
      this.type = this.property.type;
    }
  }

  getType(entity) {
    return entity.type.subType;
  }

  get(context) {
    return this.property.get(context.lookup(this.getType(this.object.get(context)).type).closure);
    // return context.lookup(this.getType(this.object.get(context))).closure.lookup(this.property.key);
  }


}

module.exports = MemberExpression;
