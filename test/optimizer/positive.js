/* eslint-disable quotes */

module.exports = [
  [
    'not false',
    '{ Program (BoolLit : true)}',
  ],
  [
    'Num x = -9',
    '{ Program (VariableID = x, Type : (Type: Num ), Val : (NumLit : -9))}',
  ],
  [
    'Num n = 5 + 1',
    '{ Program (VariableID = n, Type : (Type: Num ), Val : (NumLit : 6))}',
  ],
  [
    'Str s = \'hello\' ^ \' world"\'',
    '{ Program (VariableID = s, Type : (Type: Str ), Val : StringLit : ello world)}',
  ],
  [
    'Bool b = (4 < 10) or (false)',
    '{ Program (VariableID = b, Type : (Type: Bool ), Val : (BoolLit : true))}',
  ],
  [
`
Num n = 4
if n < 0:
  Num z = 0
else if true:
  Num y = 0
else if n < 1:
  Num w = 0
else:
  Num e = 0
`,
    '{ Program (VariableID = n, Type : (Type: Num ), Val : (NumLit : 4))If (Case: test: (BinaryExpression (Left : (VariableId : n)) (Op : <) (Right : (NumLit : 0))) block: (Block) Case: test: (BoolLit : true) block: (Block) )}',
  ],
  [
    `
Num n = 4
if n < 0:
  Num z = 0
else if false:
  Num y = 0
else if n < 1:
  Num w = 0
else:
  Num e = 0
`,
    '{ Program (VariableID = n, Type : (Type: Num ), Val : (NumLit : 4))If (Case: test: (BinaryExpression (Left : (VariableId : n)) (Op : <) (Right : (NumLit : 0))) block: (Block) Case: test: (BinaryExpression (Left : (VariableId : n)) (Op : <) (Right : (NumLit : 1))) block: (Block) Case: test: (BoolLit : true) block: (Block) )}',
  ]


];
