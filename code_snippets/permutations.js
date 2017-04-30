// Javascript code generated from Whiteboard code!
/* ---------------- START OF LIBRARY --------------------- */

// PRINT
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
Array.prototype._15 = function({_16} ) {this.push(_16); return this}
Array.prototype._17 = function({} ) {return this.pop()}

// MATH
const _18 = {}
_18._19 = function({_20} ) {return Math.cos(_20)}
_18._21 = function({_22} ) {return Math.sin(_22)}
_18._23 = function({_24} ) {return Math.tan(_24)}
_18._25 = function({_26} ) {return Math.abs(_26)}
_18._27 = function({_28} ) {return Math.floor(_28)}

// STRING
String.prototype._29 = function({} ) {return this.length}
String.prototype._30 = function({_31, _32} ) {return this.substring(_31, _32)}
String.prototype._33 = function({_34} ) {return this.indexOf(_34)}
String.prototype._35 = function({_36} ) {return this.charAt(_36)}
/* ----------------- END OF LIBRARY ---------------------- */


let _37 = ({_38} , ..._39) => {
  _1({_2 : _38})
  if((_38 === 0)) {
    return new _7({})
  }
  else if((_38 === 1)) {
    return new _7({}, new _7({}, 1))
  }
  let _40 = _37({_38 : (_38 - 1)})
  let _41 = new _7({})
  for (let _42 in _40) {
    if ((_40).hasOwnProperty(_42)) {
      let _43 = _40._9({_10 : _42})
      let _44 = _4({_5 : 0, _6 : _38})
      for (let _45 in _44) {
        if ((_44).hasOwnProperty(_45)) {
          _45 = _44._9({_10 : _45})
          let _46 = _43._12({_13 : _45, _14 : _38})
          _41._15({_16 : _46})
        }
      }
    }
  }
  return _41
}
let _47 = _37({_38 : 4})
_1({_2 : _47._11({})})
_1({_2 : _47})
