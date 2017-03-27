class Params {
  constructor(p1, parameter) {
    // console.log(p1);
    // this.parameter = (p1) ? ((parameter) ? p1.concat(parameter[0]) : p1) : [];
  }

  toString() {
    console.log(this.parameter);
    let list = '';
    for (let i = 0; i < this.parameter.length; i++) {
      list += `${list}${this.parameter[i].toString()}`;
    }
    return list;
  }
}

module.exports = Params;
