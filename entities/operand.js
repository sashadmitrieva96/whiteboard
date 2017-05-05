const Type = require('./type.js');

class Operand {
  constructor(op) {
    this.op = op;
  }

  toString() {
    return `${this.op}`;
  }

  analyze() {
    this.type = new Type(this.resultType());
    this.argumentType = new Type(this.argType());
  }

  argType() {
    const numberOps = ['==', '!=', '>=', '>', '<=', '<', '+', '-', '*', '/', '%', 'mod', '**', '-'];
    const booleanOps = ['==', '!=', 'and', 'or', '!', 'not'];
    const stringOps = ['^', '==', '!='];

    const result = [];
    if (booleanOps.includes(this.op)) {
      result.push(Type.Bool);
    }
    if (numberOps.includes(this.op)) {
      result.push(Type.Num);
    }
    if (stringOps.includes(this.op)) {
      result.push(Type.Str);
    }
    return result;
  }

  resultType() {
    const numberOps = ['+', '-', '*', '/', '%', 'mod', '**', '-'];
    const booleanOps = ['==', '!=', '>=', '>', '<=', '<', 'and', 'or', '!', 'not'];
    const stringOps = ['^'];

    const result = [];
    if (booleanOps.includes(this.op)) {
      result.push(Type.Bool);
    }
    if (numberOps.includes(this.op)) {
      result.push(Type.Num);
    }
    if (stringOps.includes(this.op)) {
      result.push(Type.Str);
    }

    return result;
  }

  compatibleWithArgument(type) {
    const poss = this.argType();
    let result = false;
    poss.forEach((t) => {
      if (t.isCompatible(type)) {
        result = true;
      }
    });
    return result;
  }

  getBinaryType() {
    return this.resultType()[0];
  }

  get() {
    return this;
  }

  optimize() {
    return this;
  }
}

module.exports = Operand;
