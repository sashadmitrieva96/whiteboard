class Type {
  constructor(type, p2) {
    console.log(p2);
    console.log("       " + type);
    this.type = type;
  }

  toString() {
    return `(TypeId : ${this.type})`;
  }

  equals(other) {
    // console.log(this.type);
    // console.log(other.type);
    if (this.type === Type.UNKNOWN.type) {
      this.type = other.type;
    }
    if (other.type === Type.UNKNOWN.type) {
      other.type = this.type;
    }
    return this.type === other.type;
  }

  assertTypeCompatability(typeList, message) {
    typeList.forEach((t) => {
      if (!this.equals(t)) {
        throw new Error(`Type Error: ${message}`);
      }
    });
  }

  isCompatibleWith(other) {
    return true;
  }

  analyze(context) {
    // finish this lol -sash
    // Type[this.type] = new Type(this.type);
  }
}

Type.typeList = Object.create(null);

Type.lookupType = (name) => {
  if (Type.typeList[name]) {
    return Type.typeList[name];
  }
  throw new Error(`No defined type ${name}`)
}

Type.Bool = new Type('Bool');
Type.Num = new Type('Num');
Type.Str = new Type('String');
Type.UNKNOWN = new Type('*Unknown');

Type.typeList.Bool = Type.Bool;
Type.typeList.Num = Type.Num;
Type.typeList.Str = Type.Str;


module.exports = Type;
