class Type {
  constructor(type = Type.arbitrary.type, subType = null) {
    if (type === '' || type === undefined) {
      this.type = Type.arbitrary.type;
    } else {
      this.type = type;
    }
    this.subType = subType;
  }


  toString() {
    return `(Type: ${this.type} ${this.subType ? `, subtype: ${this.subtype}` : ''})`;
  }

  assertTypeCompatability(other) {
    if (!other) {
      throw new Error('other has no type');
    }

    if (this.type === '<arbitrary>' || other.type === '<arbitrary>') {
      return;
    }

    if (this.type !== other.type) {
      throw new Error('Types incompatible');
    }
  }

  isCompatible(other) {
    if (!other) {
      throw new Error('other has no type');
    }

    if (this.type === '<arbitrary>' || other.type === '<arbitrary>') {
      return true;
    }

    if (this.type !== other.type) {
      return false;
    }
    return true;
  }

  assertProducesType(other) {
    if (this.type !== 'Function') {
      throw new Error('Not a function');
    }
    this.subType.assertTypeCompatability(other);
  }
}

Type.Bool = new Type('Bool');
Type.Str = new Type('Str');
Type.Num = new Type('Num');
Type.List = new Type('List');
Type.Type = new Type('Type');
Type.Function = new Type('Function');
Type.None = new Type('None');
Type.Arbritrary = new Type('<arbitrary>');

module.exports = Type;
