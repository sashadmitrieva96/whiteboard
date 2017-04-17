const Type = require('./type.js');
const TypeObject = require('./helpers/type_object.js');

class VariableAssignment {
  constructor(id, expression) {
    this.key = id;
    this.expression = expression;
  }

  analyze(context) {
    this.expression.analyze(context);
    this.type = this.expression.type;
    // console.log(this.type);

    this.type.assertTypeCompatability(context.lookup(this.key).type);
    context.replace(this.key, this);
  }

  get(context) {
    return context.lookup(this.key);
  }
}

module.exports = VariableAssignment;
