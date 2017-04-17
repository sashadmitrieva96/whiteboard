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
    console.log('---------------', this.property);
    this.property.analyze(context);
    console.log('---------------', this.property);
    this.property = this.property.get(context);
    if (this.isLiteral) {
      this.property.analyze(this.object.get(context).callee.closure);
      this.type = this.property.type;
    } else {
      this.property.analyze(context);
      console.log('---------------', this.property);
      this.property.type.assertTypeCompatability(new TypeObject(['Str', 'Num']));
      console.log('ok exp');
      const varExp = new VariableExpression(this.property.value);
      varExp.analyze(this.object.get(context).callee.closure);
      this.type = varExp.type;
    }
  }

  get(context) {
    return this;
  }


}

module.exports = MemberExpression;
