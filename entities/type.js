class Type {
  constructor(type = Type.arbitrary.type, subType = null) {
    if (type === '' || type === undefined) {
      this.type = Type.arbitrary.type;
    } else {
      this.type = type;
    }
    this.subType = subType;
    if (type === 'List' && !this.subType) {
      this.subType = Type.Arbritrary;
    }
    // console.log(require('util').inspect(this, { depth: null }));;
  }


  toString() {
    return `(Type: ${this.type} ${this.subType ? `, subtype: ${this.subtype}` : ''})`;
  }

  assertTypeCompatability(other) {
    // console.log('this: ', this);
    // console.log('other: ', other);
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

Type.Arbritrary = new Type('<arbitrary>');
Type.Bool = new Type('Bool');
Type.Str = new Type('Str');
Type.Num = new Type('Num');
Type.List = new Type('List', Type.Arbritrary);
Type.Type = new Type('Type');
Type.Function = new Type('Function');
Type.None = new Type('None');


module.exports = Type;
