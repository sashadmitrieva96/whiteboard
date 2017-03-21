class Args {
  constructor(a1, args) {
    this.args = a1.concat(args[0]);
  }
  toString(){
    let list = "(Args ";
  	for (var i = 0; i < this.args.length; i++) {
  		 list += this.args[i].toString() + ", ";
  	};
	return list + ")";
  }
}

module.exports = Args;
