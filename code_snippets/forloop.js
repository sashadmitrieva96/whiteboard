// Javascript code generated from Whiteboard code!
function _1({_2} ) { console.log(_2) }

// Range
function _4({_5 = 0, _6} ) {
let array = new Array();
let range = _6 -_5
for (i = 0; i < range; i++) {
    array[i] = i + _5;
}
return array }

// LIST
function _7({} , ..._8) { return _8 }
Array.prototype._9 = function({_10} ) {return this[_10]}
Array.prototype._11 = function({} ) {return this.length}
Array.prototype._12 = function({_13, _14} ) {let s = this.slice(0, _13); let e = this.slice(_13, this.length); let temp = new _7({}, [...s, _14, ...e]); temp = temp[0]; return temp;}

// MATH
const _15 = {}
_15._16 = function({_17} ) {return Math.cos(_17)}
_15._18 = function({_19} ) {return Math.sin(_19)}
_15._20 = function({_21} ) {return Math.tan(_21)}
_15._22 = function({_23} ) {return Math.abs(_23)}
_15._24 = function({_25} ) {return Math.floor(_25)}

// STRING
String.prototype._26 = function({} ) {return this.length}
String.prototype._27 = function({_28, _29} ) {return this.substring(_28, _29)}
String.prototype._30 = function({_31} ) {return this.indexOf(_31)}
String.prototype._32 = function({_33} ) {return this.charAt(_33)}
/* ----------------- END OF LIBRARY ---------------------- */


let _34 = _4({_5 : 0, _6 : 9})
let _35 = new _7({}, `op`, `opop`)
for (let _36 in _34) {
  if ((_34).hasOwnProperty(_36)) {
    _36 = _34._9({_10 : _36})
    for (let _37 in _35) {
      if ((_35).hasOwnProperty(_37)) {
        _37 = _35._9({_10 : _37})
        _1({_2 : _36})
        _1({_2 : _37})
      }
    }
  }
}
