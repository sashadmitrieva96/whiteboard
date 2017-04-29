class TypeObject {
  constructor(listOfTypes, structure = 'prim') {
    this.type = listOfTypes;
    this.structure = structure;
  }

  assertTypeCompatability(other) {
    if (!other) {
      throw new Error('other has no type');
    }
    const shared = (a1, a2) =>
      a1.filter(n => a2.includes(n));


    const alikeTypes = shared(this.type, other.type);

    if (alikeTypes.length === 0) {
      throw new Error('Types incompatible');
    }
    this.type = alikeTypes;
    other.type = alikeTypes;
  }
}

module.exports = TypeObject;
