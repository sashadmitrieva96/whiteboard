class Params {
  constructor(p1, parameter) {
    this.parameter = p1.concat(parameter[0]);
  }

  toString() {
    let list = '';
    for (let i = 0; i < this.parameter.length; i++) {
      list += `${list}${this.parameter[i].toString()}`;
    }
    return list;
  }
}

module.exports = Params;
