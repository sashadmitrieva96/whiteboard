/* eslint-disable quotes */

module.exports = [
  [
    'not false',
    '{ Program (BoolLit : true)}'
  ],
  [
    'Num x = -9',
    '{ Program (VariableID = x, Type : (Type: Num ), Val : (NumLit : -9))}'
  ],
  [
    'Num n = 5 + 1',
    '{ Program (VariableID = n, Type : (Type: Num ), Val : (NumLit : 6))}'
  ]


];
