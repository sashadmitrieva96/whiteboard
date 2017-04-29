// Javascript code generated from Whiteboard code!
function _1({_2} ) { console.log(_2) }
/* ---------------- START OF LIBRARY --------------------- */
class _4 {
  constructor({_5} , ..._6) {
    this.value = _5
  }
}
_4.prototype._9 = function({} ) {return this.value.length}
_4.prototype._10 = function({_11, _12} ) {let s = this.value.slice(0, _11); let e = this.value.slice(_11, this.value.length); let temp = new _4({}, [...s, _12, ...e]); temp.value = temp.value[0]; return temp;}
const _13 = {}
_13._14 = function({_15} ) {return Math.cos(_15)}
_13._18 = function({_19} ) {return Math.tan(_19)}
_13._16 = function({_17} ) {return Math.sin(_17)}
_13._20 = function({_21} ) {return Math.abs(_21)}
_13._22 = function({_23} ) {return Math.floor(_23)}
String.prototype._25 = function({_26, _27} ) {return this.substring(_26, _27)}
String.prototype._24 = function({} ) {return this.length}
String.prototype._28 = function({_29} ) {return this.indexOf(_29)}
String.prototype._30 = function({_31} ) {return this.charAt(_31)}
/* ----------------- END OF LIBRARY ---------------------- */


let _32 = `hello`
_1({_2 : _32})
class _33 {
  constructor ({_34} , ..._35) {
    this._36 = _34
  }
}
let _37 = new _33({_34 : `woomfy`})
_1({_2 : _37._36})
_4.prototype._7 = function({_8} ) {return this.value[_8]}
