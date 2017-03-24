class MemberExpression {
  constructor(object, property) {
    this.object = object;
    this.property = property;
  }

  toString() {
    return `(MemberObject : ${this.object.toString()} . MemberProperty : ${this.property.toString()})`;
  }
}

module.exports = MemberExpression;
