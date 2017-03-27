class Type {
  constructor(type) {
    this.type = type;
  }

  toString() {
    return `(TypeId : ${this.type})`;
  }
}

module.exports = Type;
