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
    this.object.analyze(context);

    if (this.isLiteral) {
      let propClosure = context.lookup(this.getType(this.object.get(context))).closure;

      if (this.object.get(context).isType) {
        propClosure = this.object.get(context).closure;
      }
      this.property.analyze(propClosure);
      this.type = this.property.type;
    }
  }

  getType(entity) {
    if (entity.type.type === Type.Function.type || entity.type.type === Type.Type.type) {
      return entity.type.subType.type;
    }
    return entity.type.type;
  }

  get(context) {
    let result = this.object.get(context);
    if (result.callee) {
      return context.lookup(result.type.type).closure.lookup(this.property.key);
    }
    if (this.object.get(context).isType) {
      return this.object.get(context).closure.lookup(this.property.key);
    }
    result = this.getType(result);
    result = context.lookup(result).closure;
    return result.lookup(this.property.key)
  }

  optimize() {
    this.object = this.object.analyze();
    return this;
  }


}

module.exports = MemberExpression;
