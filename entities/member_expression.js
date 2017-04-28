const TypeObject = require('./helpers/type_object.js');
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
    // console.log('test', context.lookup(this.getType(this.object.get(context))));
    if (this.isLiteral) {
      // ASSUMES A FUNCTION...?
      const gotObject = this.object.get(context);
      // const propClosure = gotObject.callee.get(context).closure;
      const propClosure = context.lookup(this.getType(this.object.get(context))).closure;
      // console.log('test', this.object.get(context));
      this.property.analyze(propClosure);
      this.type = this.property.type;
    } else {
      this.property.analyze(context);
      this.property = this.property.get(context);
      // console.log(this.property);
      this.property.get(context).type.assertTypeCompatability(new TypeObject(['Str', 'Num']));
      // doesnt handle strings that were not explicitely defined.
      const varExp = new VariableExpression(this.property.get(context).value);
      varExp.analyze(this.object.get(context).callee.closure);
      this.type = varExp.type;
    }
  }

  getType(entity) {
    return entity.type.type[0];
  }

  get(context) {
    return context.lookup(this.getType(this.object.get(context))).closure.lookup(this.property.key);
  }


}

module.exports = MemberExpression;
