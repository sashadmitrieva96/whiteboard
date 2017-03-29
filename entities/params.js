class Params {
  constructor(p1, params) {
    if (params.length === 0) {
      this.params = p1;
    } else {
      this.params = p1.length === 0 ? [] : p1.concat(params[0]);
    }
  }

  toString() {
    let list = '(Params ';
    for (let i = 0; i < this.params.length; i++) {
      list = `${list}${this.params[i].toString()}`;
    }
    list = `${list})`;
    return list;
  }

  analyze(context) {
    this.params.forEach(s => s.analyze(context));
  }

}

module.exports = Params;
