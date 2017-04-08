const util = require('util');

class Params {
  constructor(p1, params) {
    if (params.length === 0) {
      this.params = p1;
    } else {
      this.params = p1.length === 0 ? [] : p1.concat(params[0]);
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
    this.params.forEach((s) => {
      // console.log(s);
      s.analyze(context);
      if (s.id) {
        context.addVariable(s.id.id, s);
      } else if (s.key) {
        this.paramNames.push(s.key.id, s);
      }
    });
    // console.log(util.inspect(context, {depth: null}));
  }

  hasName(name) {
    return this.paramNames.includes(name);
  }

}

module.exports = Params;
