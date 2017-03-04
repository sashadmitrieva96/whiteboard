class Args{
  constructor(args) {
    this.args = args;
  }
  toString(){
    let list = "(Args ";
  	for (var i = 0; i < args.length; i++) {
  		 list += this.args[i].toString() + " ";
  	};
	return list + ")";
  }
}

module.exports = Args;
