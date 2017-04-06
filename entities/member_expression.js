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
  }
}

module.exports = MemberExpression;
