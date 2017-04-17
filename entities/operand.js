const TypeObject = require('./helpers/type_object.js');

class Operand {
  constructor(op) {
    this.op = op;
  }

  toString() {
    return `${this.op}`;
  }

  analyze() {
    this.type = new TypeObject(this.resultType());
    this.argumentType = new TypeObject(this.argType());
  }

  argType() {
    const numberOps = ['==', '!=', '>=', '>', '<=', '<', '+', '-', '*', '/', '%', 'mod', '**', '-'];
    const booleanOps = ['==', '!=', 'and', 'or', '!', 'not'];
    const stringOps = ['==', '!=', '+'];

    const result = [];
    if (booleanOps.includes(this.op)) {
      result.push('Bool');
    }
    if (numberOps.includes(this.op)) {
      result.push('Num');
    }
    if (stringOps.includes(this.op)) {
      result.push('Str');
    }
    return result;
  }

  resultType() {
    const numberOps = ['+', '-', '*', '/', '%', 'mod', '**', '-'];
    const booleanOps = ['==', '!=', '>=', '>', '<=', '<', 'and', 'or', '!', 'not'];
    const stringOps = ['+'];

    const result = [];
    if (booleanOps.includes(this.op)) {
      result.push('Bool');
    }
    if (numberOps.includes(this.op)) {
      result.push('Num');
    }
    if (stringOps.includes(this.op)) {
      result.push('Str');
    }

    return result;
  }

  getBinaryType(l) {
    if (this.op !== '+') {
      return this.type;
    }
    return l;
  }

  get() {
    return this;
  }
}

module.exports = Operand;
