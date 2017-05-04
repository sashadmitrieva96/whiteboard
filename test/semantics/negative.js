/* eslint-disable quotes */


module.exports = [
  [`Num kevin = 'man'`,
    'Error: Type Error: declared Type (TypeId : Num) does not match expression type (TypeId : String)'],
  [`
if 6:
  x = 12
  `, 'Error: Type Error: case: (NumLit : 6)'],

  ['return 4', 'Error: Return statement is not in function'],

  [`if true:
      return true`, 'Error: Return statement is not in function'],
  [`Num let = (o)`, 'Error: The id o has not been declared'],
  [`
fun = (Num x, Num y, Num z):
  return x
x = fun(w: 88, 9)
`, ''],
];
