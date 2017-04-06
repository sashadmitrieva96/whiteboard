class Context {
  contstructor({ parent, inFunction, inLoop, inTypeDecl }) {
    this.parent = parent;
    this.inFunction = inFunction;
    this.inLoop = inLoop;
    this.inTypeDecl = inTypeDecl;
    this.closure = Object.create(null);
  }

  createChildContextForFunction() {
    return new Context(this, true, false, false);
  }

  createChildContextForLoop() {
    return new Context(this, false, true, false);
  }
  createChildContextForType() {
    return new Context(this, false, false, true);
  }

  addVariable(id, entity) {
    if (id in this.closure) {
      throw new Tilt(`The id ${id} is already declared`);
    }
    this.variables[id] = entity;
  }

  inClosure(id) {
    return !(this.closure[id] === undefined);
  }

  lookup(id) {
    if (id in this.closure) {
      return this.closure[id];
    } else if (this.parent === null) {
      throw new Tilt(`The id ${id} has not been declared`);
    } else {
      return this.parent.lookup(id);
    }
  }
}

Context.INITIAL = new Context({ parent: null, inFunction: false, inLoop: false, inTypeDecl: false });

module.exports = Context;
