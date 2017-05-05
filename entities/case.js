const Type = require('./type.js');
const BoolLit = require('./bool_lit.js')

class Case {
  constructor(test, block) {
    this.test = test;
    this.block = block;
  }

  toString() {
    return `Case: test: ${this.test.toString()} block: ${this.block.toString()}`;
  }

  analyze(context) {
    this.test.analyze(context);
    this.test.type.assertTypeCompatability(new Type('Bool'));

    this.block.analyze(context);
  }

  get() {
    return this;
  }

  optimize() {
    this.test.optimize();
    this.block.optimize();
    if (this.test instanceof BoolLit) {
      if (this.test.value === 'false') {
        this.isFalse = true;
      } else {
        this.isTrue = true;
      }
    }
  }
}

module.exports = Case;
