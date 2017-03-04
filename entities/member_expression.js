class MemberExpression{
  constructor(object, property){
    this.object = object;
    this.property = property;
  }

  toString() {
    return `(${this.object.toString()} . ${this.property.toString()})`;
  }
}

module.exports = MemberExpression;
