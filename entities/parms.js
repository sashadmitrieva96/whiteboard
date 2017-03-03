class Parms{
  constructor(parameter) {
    this.parameter = parameter;
  }
let list = "";
  ToString(){
  	for (var i = 0; i < parameter.length; i++) {
  		 list += this.parameter[i] + " ";
  	};
	return list;
  }
}

module.exports = Parms;