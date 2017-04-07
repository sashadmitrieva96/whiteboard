class Type {
  constructor(type) {
    this.type = type;
  }

  toString() {
    return `(TypeId : ${this.type})`;
  }

  equals(other) {
    if (this.type === Type.UNKNOWN.type) {
      return true;
    }
    if (other.type === Type.UNKNOWN.type) {
      return true;
    }
    return this.type === other.type;
  }

  analyze() {
    if (this.type === '') {
      this.type = Type.UNKNOWN.type;
    }
  }

  assertTypeCompatability(typeList, message) {
    typeList.forEach((t) => {
      if (!this.equals(t)) {
        throw new Error(`Type Error: ${message}`);
      }
    });
  }
}

Type.typeList = Object.create(null);

Type.lookupType = (name) => {
  if (Type.typeList[name]) {
    return Type.typeList[name];
  }
  throw new Error(`No defined type ${name}`);
};

Type.Bool = new Type('Bool');
Type.Num = new Type('Num');
Type.Str = new Type('String');
Type.UNKNOWN = new Type('*Unknown');

Type.typeList.Bool = Type.Bool;
Type.typeList.Num = Type.Num;
Type.typeList.Str = Type.Str;


module.exports = Type;
