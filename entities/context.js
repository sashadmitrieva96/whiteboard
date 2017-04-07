const util = require('util');
const Type = require('./type.js');

class Context {
  constructor({ parent = null, inFunction = false, inLoop = false, inTypeDecl = false }) {
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

  addVariable(id, entity) {
    // console.log(`ADDING VAR ${id} INTO ${util.inspect(this.closure)}`);
    if (id in this.closure) {
      entity.type.assertTypeCompatability([this.lookup(id).type], `Attempt to redefine ${id}, to Type ${entity.type} from Type ${this.lookup(id).type}`);
    }
    this.closure[id] = entity;
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

  lookup(id) {
    if (id in this.closure) {
      return this.closure[id];
    } else if (this.parent === null) {
      throw new Error(`The id ${id} has not been declared`);
    } else {
      return this.parent.lookup(id);
    }
  }

  addType(name) {
    if (Type.typeList[name]) {
      throw new Error(`Type ${name} has already been defined`);
    }
    Type.typeList[name] = new Type(name);
  }
}

Context.INITIAL = () => new Context({ parent: null, inFunction: false, inLoop: false, inTypeDecl: false });

module.exports = Context;
