class Type {
  constructor(type) {
    this.type = type;
  }

  toString() {
    return `(TypeId : ${this.type})`;
  }

  equals(other) {
    return this.type === other.type || this.equals(Type.UNKNOWN) || other.equals(Type.UNKNOWN);
  }

  isCompatibleWith(other) {
    return true;
  }

  analyze(context) {
    // finish this lol -sash
    Type[this.type] = new Type(this.type);
  }
}

Type.BOOL = new Type('Bool');
Type.NUM = new Type('Num');
Type.STR = new Type('String');
Type.UNKNOWN = new Type('*Unknown');

module.exports = Type;
