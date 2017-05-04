/* eslint-disable quotes */
module.exports = [
  [
    `if true == ryan:
        return true
    else:
        return false
    `,
    `{ Program If (Case: test: (BinaryExpression (Left : (BoolLit : true)) (Op : ==) (Right : (VariableId : ryan))) block: (Block (Return -> (BoolLit : true))) Case: test: (BoolLit : true) block: (Block (Return -> (BoolLit : false))) )}`,
  ],

  [
    `Num kevin = 4`,
    `{ Program (VariableID = kevin, Type : (Type: Num ), Val : (NumLit : 4))}`,
  ],

  [
    `Dog woomfy`,
    `{ Program (VariableID = woomfy, Type : (Type: Dog ))}`,
  ],

  [
    `Type Square = (Num w, Num h):
        Num width = w
        Num height = h
        Num area = ():
            return width * height
    `,
    `{ Program (TypeId : (Type: Square ) (TypeParams:= (Params (VariableID = w, Type : (Type: Num ))(VariableID = h, Type : (Type: Num )))) (TypeBody : (Block (VariableID = width, Type : (Type: Num ), Val : (VariableId : w)) (VariableID = height, Type : (Type: Num ), Val : (VariableId : h)) (FunctionID : area, Params : (Params ), Block : (Block (Return -> (BinaryExpression (Left : (VariableId : width)) (Op : *) (Right : (VariableId : height)))))))))}`,
  ],
];
