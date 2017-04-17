const util = require('util');

class Params {
  constructor(p1, params) {
    // console.log('P1:', p1);
    // console.log('REST: ', params);
    if (!params) {
      this.params = p1;
    } else if (params) {
      this.params = p1 ? [p1].concat(params) : [];
    }
    if (!p1) {
      this.params = [];
    }
    this.paramNames = [];
    // console.log(util.inspect(this, { depth: null }));
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
      // console.log('********', p);
      p.analyze(context);
      this.paramNames.push(p.key);
    });
  }

  hasName(name) {
    // console.log(this.paramNames);
    return this.paramNames.includes(name);
  }

  get(context) {
    return this;
  }


}

module.exports = Params;
