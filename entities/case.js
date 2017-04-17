const Type = require('./type.js');
const TypeObject = require('./helpers/type_object.js')

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
    this.test.type.assertTypeCompatability(new TypeObject(['Bool']));

    this.block.analyze(context);
  }

  get(context) {
    return this;
  }
}

module.exports = Case;
