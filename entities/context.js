const Type = require('./type.js');

class Context {
  constructor(parent = null, inFunction = false, inLoop = false, inTypeDecl = false) {
    this.parent = parent;
    this.inFunction = inFunction;
    this.inLoop = inLoop;
    this.inTypeDecl = inTypeDecl;
    this.closure = Object.create(null);
  }

  createChildContextForFunction() {
    return new Context(this, true, this.inLoop, this.inTypeDecl);
  }

  createChildContextForLoop() {
    return new Context(this, this.inFunction, true, this.inTypeDecl);
  }
  createChildContextForType() {
    return new Context(this, this.inFunction, this.inLoop, true);
  }

  createChildContextForBlock() {
    return new Context(this, this.inFunction, this.inLoop, this.inTypeDecl);
  }

  inClosure(id) {
    return !(this.closure[id] === undefined);
  }

  assertInFunction(message) {
    if (!this.inFunction) {
      throw new Error(message);
    }
  }

  assertInLoop(message) {
    if (!this.inLoop) {
      throw new Error(message);
    }
  }

  assertInTypeDecl(message) {
    if (!this.inTypeDecl) {
      throw new Error(message);
    }
  }

  check(id) {
    if (id in this.closure) {
      return true;
    } else if (this.parent === null) {
      return false;
    }
    return this.parent.check(id);
  }

  replace(id, entity) {
    if (!this.check(id)) {
      throw new Error(`${id} has not been declared`);
    }
    this.closure[id] = entity;
  }


  addVariable(id, entity) {
    if (id in this.closure) {
      throw new Error(`${id} already declared in closure`);
    }
    this.closure[id] = entity;
  }

  lookup(id) {
    // console.log("____________" + id);
    // console.log(this);
    if (id in this.closure) {
      return this.closure[id];
    } else if (this.parent === null) {
      throw new Error(`The id ${id} has not been declared`);
    } else {
      return this.parent.lookup(id);
    }
  }

}

Context.INITIAL = new Context(null, false, false, false);

Context.INITIAL.addVariable('Str', new Type('Str'));
Context.INITIAL.addVariable('Bool', new Type('Bool'));
Context.INITIAL.addVariable('Num', new Type('Num'));

module.exports = Context;
