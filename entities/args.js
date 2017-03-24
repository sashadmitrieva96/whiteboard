class Args {
  constructor(a1, args) {
    this.args = a1.concat(args[0]);
  }
  toString() {
    let list = '(Args ';
    for (let i = 0; i < this.args.length; i++) {
      list = `${list}  ${this.args[i].toString()}`;
    }
    list = `${list})`;
    return list;
  }
}

module.exports = Args;
