const Type = require('./type.js');

class Case {
  constructor(test, block) {
    this.test = test;
    this.block = block;
  }

  toString() {
    return `Case: test: ${this.test.toString()} block: ${this.block.toString()}`;
  }

  analyze(context) {
    // console.log(util.inspect(this.block, { depth: null }));
    this.test.analyze(context);
    Type.Bool.assertTypeCompatability([this.test.type], `case: ${this.test}`);

    this.block.analyze(context.createChildContextForBlock());
  }
}

module.exports = Case;
