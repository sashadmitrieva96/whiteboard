class Args {
  constructor(a1, args) {
    // console.log('IN ARGS');
    if (!args) {
      this.args = a1;
    } else if (args) {
      this.args = a1 ? [a1].concat(args) : [];
    }
    if (!a1) {
      this.args = [];
    }
    // console.log(this.args);
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
    this.args.forEach((a) => {
      a.analyze(context);
    });
  }

  get() {
    return this;
  }

}

module.exports = Args;
