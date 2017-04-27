class Params {
  constructor(p1, params) {
    if (!params) {
      this.params = p1;
    } else if (params) {
      this.params = p1 ? [p1].concat(params) : [];
    }
    if (!p1) {
      this.params = [];
    }
    this.paramNames = [];
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
    this.params.forEach((p) => {
      p.analyze(context);
      this.paramNames.push(p.key);
    });
  }

  hasName(name) {
    return this.paramNames.includes(name);
  }

  get() {
    return this;
  }


}

module.exports = Params;
