const Numlit = require('./num_lit.js');
const BoolLit = require('./bool_lit.js');
const StrLit = require('./str_lit.js');

class BinaryExpression {
  constructor(left, op, right) {
    this.left = left;
    this.op = op;
    this.right = right;
  }

  toString() {
    return `(BinaryExpression (Left : ${this.left.toString()}) (Op : ${this.op.toString()}) (Right : ${this.right.toString()}))`;
  }

  analyze(context) {
    this.op.analyze();
    this.left.analyze(context);
    this.right.analyze(context);

    this.left.type.assertTypeCompatability(this.right.type);
    this.op.compatibleWithArgument(this.left.type);
    this.op.compatibleWithArgument(this.right.type);

    this.type = this.op.getBinaryType(this.left.type, this.right.type);
  }

  get() {
    return this;
  }

  optimize() {
    /* eslint-disable default-case */
    /* eslint-disable no-restricted-properties */
    if (this.left instanceof Numlit && this.right instanceof Numlit) {
      const NumericOperands = ['+', '-', '*', '/', '%', 'mod', '**', '==', '!=', '>=', '>', '<=', '<'];
      switch (NumericOperands.indexOf(this.op.op)) {
        case 0:
          return new Numlit(this.left.value + this.right.value);
        case 1:
          return new Numlit(this.left.value - this.right.value);
        case 2:
          return new Numlit(this.left.value * this.right.value);
        case 3:
          return new Numlit(this.left.value / this.right.value);
        case 4:
          return new Numlit(this.left.value % this.right.value);
        case 5:
          return new Numlit(this.left.value % this.right.value);
        case 6:
          return new Numlit(Math.pow(this.left.value, this.right.value));
        case 7:
          return new BoolLit(this.left.value === this.right.value);
        case 8:
          return new BoolLit(this.left.value !== this.right.value);
        case 9:
          return new BoolLit(this.left.value >= this.right.value);
        case 10:
          return new BoolLit(this.left.value > this.right.value);
        case 11:
          return new BoolLit(this.left.value <= this.right.value);
        case 12:
          return new BoolLit(this.left.value < this.right.value);
      }
    } else if (this.left instanceof StrLit && this.right instanceof StrLit) {
      return new StrLit(this.left.value + this.right.value);
    }
  }
}

module.exports = BinaryExpression;
