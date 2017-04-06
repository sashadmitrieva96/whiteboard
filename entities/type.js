class Type {
  constructor(type) {
    this.type = type;
  }

  toString() {
    return `(TypeId : ${this.type})`;
  }

  equals(other) {
    return this.type === other.type;
  }

  isCompatibleWith(other) {
    return true;
  }

  analyze(context) {
    // finish this lol
  }
}

Type.BOOL = new Type('Bool');
Type.NUM = new Type('Num');
Type.STR = new Type('String');

module.exports = Type;
