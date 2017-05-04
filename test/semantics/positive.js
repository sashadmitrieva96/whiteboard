/* eslint-disable quotes */

module.exports = [
  `
Num multiply = (Num a, Num b):
  return a * b

`,
  `Num kevin = 4`,

  `Type Square = (Num w, Num h):
      Num width = w
      Num height = h
      Num area = ():
          return width * height
`,

  `
Num varEable = 4
if varEable == 4:
  varEable = 1
else:
  varEable = 0
`,

  `
Bool bad = true
Bool good = false
Num side = (Bool guy):
    if (guy != bad):
        return 1
    else if (guy != good):
        return 2
    return 3
`,
  `
Bool testShould = (Num pass):
    Bool but = (Bool it):
        return it
    Bool x = but(true)
    return (x != false)`,

  `
Num x = 4
if x < 5:
    x = 5
Num y = x
`,
//   `
// Num y = 5
// for x in y:
//   break
// `,
  `
Type Person = (Str n):
  Str name = n
  Str getName = ():
    return name

Person m
`, `
Num fun = (Num x, Num y, Num z):
  return x
x = fun(x: 88)
`,


];
