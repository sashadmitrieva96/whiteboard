class Args {
  constructor(a1, args) {
    if (args.length === 0) {
      this.args = a1;
    } else {
      this.args = a1.length === 0 ? [] : a1.concat(args[0]);
    }
  }

  toString() {
    let list = '(Args';
    for (let i = 0; i < this.args.length; i++) {
      list = `${list}${this.args[i].toString()}`;
    }
    list = `${list})`;
    return list;
  }

  analyze(context) {
    this.args.forEach(s => s.analyze(context));
  }
}

module.exports = Args;
