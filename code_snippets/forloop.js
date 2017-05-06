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


let _42 = _4({})
let _43 = new _7({}, _4({_5 : 3, _6 : 5}), _4({_5 : 4, _6 : 6}))
for (let _44 in _42) {
  if ((_42).hasOwnProperty(_44)) {
    _44 = _42._9({_10 : _44})
    for (let _45 in _43) {
      if ((_43).hasOwnProperty(_45)) {
        _45 = _43._9({_10 : _45})
        _1({_2 : _44})
        _1({_2 : _45})
      }
    }
  }
}
_1({_2 : `----------------`})
let _46 = _4({_5 : 10, _6 : 20})
_46._15({_16 : 4})
_1({_2 : _46})
