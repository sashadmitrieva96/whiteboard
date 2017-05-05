const Rest = require('./rest.js');

class Params {
  constructor(p1, params, hasRest) {
    if (!params) {
      this.params = p1;
    } else if (params) {
      this.params = p1 ? [p1].concat(params) : [];
    }
    if (!p1) {
      this.params = [];
    }
    this.hasRest = hasRest;
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
    if (this.hasRest) {
      context.addVariable('rest', new Rest());
      this.restName = context.getName('rest');
    }
  }

  getParamBykey(key) {
    let result = null;
    this.params.forEach((p) => {
      if (p.key === key) {
        result = p;
      }
    });
    if (result === null) {
      throw new Error('no such param');
    }
    return result;
  }

  optimize() {
    this.params.optimize();
    return this;
  }

  hasName(name) {
    return this.paramNames.includes(name);
  }

  get() {
    return this;
  }


}

Params.newParam = (params) => {
  const result = new Params();
  result.params = params;
  return result;
};

module.exports = Params;
