class MemberExpression{
  constructor(object, property){
    this.object = object;
    this.property = property;
  }

  ToString() {
    return `(${this.object} . ${this.property})`;
  }
}

module.exports = MemberExpression;
