class Context {
  contstructor({ parent, inFunction, inLoop }) {
    this.parent = parent;
    this.inFunction = inFunction;
    this.inLoop = inLoop;
    this.closure = Object.create(null);
  }

  createChildContextForFunction() {
      return new Context(this, true, false);
  }

  createChildContextForLoop() {
      return new Context(this, false, true);
  }

  addVariable(id, entity) {
      if (id in this.closure) {
          new error(`The id ${id} is already declared`);
      }
      this.variables[id] = entity;
  }

  lookup(id) {
      if (id in this.closure) {
          return this.closure[id];
      } else if (this.parent === null) {
          throw new error(`The id ${id} has not been declared`)
      } else {
          return this.parent.lookup(id);
      }
  }


}

Context.INITIAL = new Context({ parent: null, inFunction: false, inLoop: false });


module.exports = Context;
