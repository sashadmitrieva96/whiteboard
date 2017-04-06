const Type = require('./type.js');

class MemberExpression {
  constructor(object, property) {
    this.object = object;
    this.property = property;
  }

  toString() {
    return `(MemberObject : ${this.object.toString()} . MemberProperty : ${this.property.toString()})`;
  }

  analyze(context) {
    this.object.analyze(context);
    this.property.analyze(context);
    this.type = Type.UNKNOWN;
  }
}

module.exports = MemberExpression;
