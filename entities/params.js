class Params{
  constructor(parameter) {
    this.parameter = parameter;
  }
let list = "";
  toString(){
  	for (var i = 0; i < parameter.length; i++) {
  		 list += this.parameter[i] + " ";
  	};
	return list;
  }
}

module.exports = Params;
