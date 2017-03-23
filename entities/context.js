class Context {
  contstructor({ parent, inFunction, inLoop }) {
    this.parent = parent;
    this.inFunction = inFunction;
    this.inLoop = inLoop;
  }
}

module.exports = Context;
