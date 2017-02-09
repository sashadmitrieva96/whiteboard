# whiteboard
a whiteboard for the world to write on

![](https://raw.githubusercontent.com/sashadmitrieva96/whiteboard/master/Logo%20Ideas/wb_logo.png)

whiteboard is an easy-to-learn scripting language that compiles to Javascript, made with the intent of introducing programming syntax to first-time users.

### Grammar
#### Macrosyntax

```
WhiteBoard {
    Program        = Block
    Block          = Stmt*
    Stmt           = Loop
                   | Assign
                   | Typedecl
                   | Fundecl
                   | Cond
                   | Exp-
                   | Return
    Access         = Exp"."id                                         --prop
                   |  Exp"["Exp"]"                                    --arr

    Return         = "return" Exp
    Assign         = Type id "=" Exp
    Loop           = "for" id "in" Exp ":" Block "."
    Typedecl       = "Type" id ":" Block "."                          --plain
                   | "Type" id "extends" Type ("," Type)*":"          --inher
    Exp            =  FunCall
                   | Access
                   |  Exp1


    Exp1           = Exp1 "or" Exp2                                   --bin
                   | Exp2
    Exp2           = Exp2 "and" Exp3                                  --bin
                   | Exp3
    Exp3           = Exp3 "nand" Exp4                                 --bin
                   | Exp4
    Exp4           = Rel "xor" Rel                                    --bin
                   | Rel
    Rel            = Exponent relop Exponent                          --bin
                   | Exponent


    Cond           = "if" Exp ":" Block "." ("else" "if" Exp ":" Block ".")* ("else" ":" Block ".")?


    Exponent       = Exponent expop Factor                            --bin
                   | Factor
    Factor         = Factor facop Term                                --bin
                   | Term
    Term           = Term termop Paren                                --bin
                   | Paren
    Paren          = "(" Exp ")"                                      --paren
                   | Prim

    Fundecl        = "fun" id "=" "(" ")" ":" Block "."               --empty
                   | "fun" id "=" "(" id ("," id)* ")"  ":" Block "." --params

    FunCall        = id "(" ")"                                       --empty
                   | id "(" Exp ("," Exp)* ")"                        --params

    Type           = "Num" | "String" | "Bool" | UserType
    UserType       = upper(letter)+

    Prim           = Exp"."id                                         --propacc
                   | Exp"["Exp"]"                                     --arracc
                   | id | numlit | boollit | stringlit
    expop          = "**"
    facop          = ("*" | "/" | "mod")
    termop         = ("+" | "-")
    relop          = ">" | ">=" | "<" | "<=" | "==" | "!="

    id             = "_"(letter)+ ~reserved

    numlit         = digit+
    boollit        = "true" | "false"
    stringlit			 = "'" (letter )* "'"

    reserved       = boollit | "if" | "else" | "for" | "in" | "Type" | "fun" | "or" | "and" | "xor" | "nand" | "return"

    comment        = "#" (~"#" any)+ "#"
    space          += comment
}


```

### Features

#### Variable Assignment and Declarations


#### Objects


#### If Statements


#### Loops


#### Functions


#### Exceptions


#### Comments


### Example Programs

A series of programs in whiteboard with the equivalent Javascript to compare.

#### whiteboard
```
prime.wb
fun primes = (num):
   Num LARGEST = 100000000000000
    if num < 2 or num > _LARGEST:
        throw('Out of range')
    .
    for e in range(2):
        if num mod _d == 0:
            return false
        .
    .
    return true
.
```
#### Javascript

```
function isPrime(n) {
  let LARGEST = 1000000000000;
  if (isNaN(n) || n < 2 || n > LARGEST || n % 1 !== 0) {
    throw new Error('Cannot test this for primality');
  }
  if (n % 2 === 0 && n !== 2) {
    return false;
  }
  for (var d = 3; d * d < n; d += 2) {
    if (n % d === 0) {
      return false;
    }
  }
  return true;
}
```
