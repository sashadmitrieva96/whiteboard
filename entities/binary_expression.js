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
    this.left = this.left.optimize();
    this.right = this.right.optimize();
    if (this.left instanceof Numlit && this.right instanceof Numlit) {
      const NumericOperands = ['+', '-', '*', '/', '%', 'mod', '**', '==', '!=', '>=', '>', '<=', '<'];
      const left = parseInt(this.left.value, 10);
      const right = parseInt(this.right.value, 10);

      switch (NumericOperands.indexOf(this.op.op)) {
        case 0:
          return new Numlit(left + right);
        case 1:
          return new Numlit(left - right);
        case 2:
          return new Numlit(left * right);
        case 3:
          return new Numlit(left / right);
        case 4:
          return new Numlit(left % right);
        case 5:
          return new Numlit(left % right);
        case 6:
          return new Numlit(Math.pow(left, right));
        case 7:
          return new BoolLit(left === right);
        case 8:
          return new BoolLit(left !== right);
        case 9:
          return new BoolLit(left >= right);
        case 10:
          return new BoolLit(left > right);
        case 11:
          return new BoolLit(left <= right);
        case 12:
          return new BoolLit(left < right);
      }
    } else if (this.left instanceof StrLit && this.right instanceof StrLit) {
      if (this.op.op === '==') {
        return new StrLit(this.left.value === this.right.value);
      } else if (this.op.op === '!=') {
        return new StrLit(this.left.value !== this.right.value);
      }
      return new StrLit(this.left.value + this.right.value);

    } else if (this.left instanceof BoolLit && this.right instanceof BoolLit) {
      if (this.op.op === 'and') {
        return new BoolLit(this.left.value && this.right.value);
      } else if (this.op.op === 'or') {
        return new BoolLit(this.left.value || this.right.value);
      }
      return new BoolLit(this.left.value + this.right.value);
    }
    return this;
  }
}

module.exports = BinaryExpression;
