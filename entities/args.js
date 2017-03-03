class Args{
  constructor(args) {
    this.args = args;
  }
let list = "";
  ToString(){
  	for (var i = 0; i < args.length; i++) {
  		 list += this.args[i] + " ";
  	};
	return list;
  }
}

module.exports = Args;