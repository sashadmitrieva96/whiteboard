class Type {
  constructor(type) {
    this.type = type;

  }

  toString() {
    return `(TypeId : ${this.type})`;
  }

  analyze(context) {
    // finish this lol
  }
}

Type.BOOL = new Type('bool');
Type.NUM = new Type('num');
Type.STR = new Type('string');

module.exports = Type;
