class TypeObject {
  constructor(listOfTypes) {
    this.type = listOfTypes;
  }

  assertTypeCompatability(other) {
    if (!other) {
      throw new Error('other has no type');
    }
    // console.log(this);
    // console.log(other);
    const shared = (a1, a2) => {
      return a1.filter((n) => {
        return a2.includes(n);
      });
    };

    const alikeTypes = shared(this.type, other.type);

    if (alikeTypes.length === 0) {
      throw new Error('Types incompatible');
    }
    this.type = alikeTypes;
    other.type = alikeTypes;
  }
}

module.exports = TypeObject;
