class Type {
  constructor(type) {
    this.type = type;
  }

  toString() {
    return `(TypeId : ${this.type})`;
  }

  equals(other) {
    if (this.type === Type.UNKNOWN.type) {
      this.type = other.type;
    }
    if (other.type === Type.UNKNOWN.type) {
      other.type = this.type;
    }
    return this.type === other.type;
  }

  assertTypeCompatability(typeList) {
    typeList.forEach((t) => {
      if (!this.equals(t)) {
        throw new Error('Types do not match')
      }
    });
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
