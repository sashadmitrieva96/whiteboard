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
      const left = parseInt(this.left.value, 10);
      const right = parseInt(this.right.value, 10);

      if (this.op.op === '+') {
        return new Numlit(left + right);
      } else if (this.op.op === '-') {
        return new Numlit(left - right);
      } else if (this.op.op === '*') {
        return new Numlit(left * right);
      } else if (this.op.op === '/') {
        return new Numlit(left / right);
      } else if (this.op.op === '%' || this.op.op === 'mod') {
        return new Numlit(left % right);
      } else if (this.op.op === '**') {
        return new Numlit(Math.pow(left, right));
      } else if (this.op.p === '==') {
        return new BoolLit(left === right);
      } else if (this.op.op === '!=') {
        return new BoolLit(left !== right);
      } else if (this.op.op === '>=') {
        return new BoolLit(left >= right);
      } else if (this.op.op === '>') {
        return new BoolLit(left > right);
      } else if (this.op.op === '<=') {
        return new BoolLit(left <= right);
      } else if (this.op.op === '<') {
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
