class Type {
  constructor(type) {
    // console.log(type);
    this.key = type;
    // console.log(type);
    if (type === '') {
      this.key = Type.UNKNOWN.type;
    }
  }

  toString() {
    return `(TypeId : ${this.key})`;
  }


}


Type.Bool = new Type('Bool');
Type.Num = new Type('Num');
Type.Str = new Type('String');
Type.UNKNOWN = new Type('*Unknown');


module.exports = Type;
