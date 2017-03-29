class Type {
  constructor(type) {
    this.type = type;

  }

  toString() {
    return `(TypeId : ${this.type})`;
  }
}

Type.bool = new Type('bool');
Type.number = new Type('number');

module.exports = Type;
