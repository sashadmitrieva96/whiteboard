/*
  Holds the positive tests for the parser.  Not JSON to more simply handle new lines.
*/

module.exports = [
  'array.get(3)',
  'true or false',
  'Num n = 3 * (27 + 8)',
  'Str s = \'hello\' ^ \' world!\'',
  'Num y = 3 mod 7',
  'print(0.0789)',
  `for x in y:
    break
  `,
  'Square square = Square(3, 4)',
  `
Num double = (n: 4):
  return n * 2
`,
  `
Type Per_son = (n: 'toal'):
  name = n
`,
  '4 == 8 + -n',

];
