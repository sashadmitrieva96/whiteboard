class Params{
  constructor(parameter) {
    this.parameter = parameter;
  }


  toString(){
    let list = "";
  	for (var i = 0; i < this.parameter.length; i++) {
  		 list += this.parameter[i] + " ";
  	};
	return list;
  }
}

module.exports = Params;
