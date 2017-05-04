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
_18._29 = function({_30, _31} ) {return Math.random()*(_31-_30+1)+_30;}

// STRING
String.prototype._32 = function({} ) {return this.length}
String.prototype._33 = function({_34, _35} ) {return this.substring(_34, _35)}
String.prototype._36 = function({_37} ) {return this.indexOf(_37)}
String.prototype._38 = function({_39} ) {return this.charAt(_39)}
String.prototype._40 = function({_41} ) {return this.split(_41)}
/* ----------------- END OF LIBRARY ---------------------- */


let _42 = ({_43} , ..._44) => {
  if((_43 <= 1)) {
    return new _7({}, new _7({}, _43))
  }
  let _45 = _42({_43 : (_43 - 1)})
  let _46 = new _7({})
  for (let _47 in _45) {
    if ((_45).hasOwnProperty(_47)) {
      let _48 = _45._9({_10 : _47})
      let _49 = _4({_5 : 0, _6 : _43})
      for (let _50 in _49) {
        if ((_49).hasOwnProperty(_50)) {
          _50 = _49._9({_10 : _50})
          let _51 = _48._12({_13 : _50, _14 : _43})
          _46._15({_16 : _51})
        }
      }
    }
  }
  return _46
}
let _52 = _42({_43 : 4})
_1({_2 : _52._11({})})
_1({_2 : _52})
