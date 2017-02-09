# whiteboard
a whiteboard for the world to write on

![](https://raw.githubusercontent.com/sashadmitrieva96/whiteboard/master/Logo%20Ideas/wb_logo.png)

whiteboard is an easy-to-learn scripting language that compiles to Javascript, made with the intent of introducing programming syntax to first-time users.

### Grammar
#### Macrosyntax

```
WhiteBoard {
    Program       = Block
    Block         = Stmt*
    Stmt          = Loop
                  | Assign
                  | Typedecl
                  | Fundecl
                  | Dictdecl
                  | Cond
                  | Exp0
                  | Return

    Access        = Exp"."id                                                --prop
                  |  Exp "[" Exp "]"                                        --arr

    Return        = "return" Exp
    Assign        = Type id "=" Decl                                        --type
                  |  id "=" Decl                                            --notype
    Loop          = "for" id "in" Exp ":" Block "."
    Typedecl      = "Type" id ":" Block "."                                 --plain
                  | "Type" id "extends" Type ("," Type)*":"                 --inher
    Dictdecl      = "Dict" "(" ")"                                          --empty
                  | "Dict" "(" Exp ":" Exp ( "," Exp ":" Exp)* ")"          --args

    Decl          = Dictdecl
                  | Exp0

    Exp0          = Access
                  | Exp
    Exp           =  FunCall
                  |  Access
                  |  Exp1


    Exp1          = Exp1 "or" Exp2                                           --bin
                  | Exp2
    Exp2          = Exp2 "and" Exp3                                          --bin
                  | Exp3
    Exp3          = Exp3 "nand" Exp4                                         --bin
                  | Exp4
    Exp4          = Rel "xor" Rel                                            --bin
                  | Rel
    Rel           = Exponent relop Exponent                                  --bin
                  | Exponent


    Cond          = "if" "(" Exp ")" ":" Block "." ("else" "if" "(" Exp ")" ":" Block ".")* ("else" ":" Block ".")?


    Exponent      = Exponent expop Factor                                    --bin
                  | Factor
    Factor        = Factor facop Term                                        --bin
                  | Term
    Term          = Term termop Paren                                        --bin
                  | Paren
    Paren         = "(" Exp0 ")"                                             --paren
                  | Prim

    Fundecl       = "fun" id "=" "(" ")" ":" Block "."                       --empty
                  | "fun" id "=" "(" id ("," id)* ")"  ":" Block "."         --params
                  | "fun" id "=" Exp                                         --exp

    FunCall       = id "(" ")"                                               --empty
                  | id "(" Exp ("," Exp)* ")"                                --params

    Type          = "Num" | "String" | "Bool" | UserType
    UserType      = upper(letter)+

    Prim          = Access
                  | id | numlit | boollit | stringlit
    expop         = "**"
    facop         = ("*" | "/" | "mod")
    termop        = ("+" | "-")
    relop         = ">=" | ">" | "<=" | "<" | "!=" | "=="

    id            = ~reserved (letter)(alphanum | "_" | "-")* ~reserved

    numlit        = digit+
    boollit       = "true" | "false"
    stringlit     = "'" (~"'" any )* "'"
    alphanum      = (letter | digit)
    reserved      = boollit | "if" | "else" | "for" | "in " | "Type" | "fun" | "or" | "and" | "xor" | "nand" | "return"

    comment       = "#" (~"#" ~"\n" any)+ "\n"                               --sl
                  |  "##" (~"#" any)+ "##"                                   --ml
    space         += comment
}
```

### Features

#### Variable Assignment and Declarations


#### Types and Objects

In whiteboard, types are essentially objects. The built-in types are **String**, **Num**, **Bool**, **Dict**, **List**, **Set**, and **Stack**.

```
String x = 'Hello World'
Num n = 5
Bool cond = true
Dict websters = Dict(k1: v1, k2: v2)

List shopping = List(milk, oreos, oranges)
Set tennis = Set(win, tie, loss)
Stack plates = Stack(small_plate, small_plate, dinner_plate)
```

If the user wants to create their own type, they are provided with the custom **UserType**, which is the same as creating an object of that type.

```
Type Cat:
    fun init = ():
        this.legs = 4
        this.paws = "cute"
    .

    fun walk = (steps):
        Num steps = 5
    .
.
```

#### If Statements

```
bool tragicBackstory = false

if (roll > 19 or (perception == 20 and intellegence >= 18)) :
  rerollOPCharacter()
.
else if (roll < 5 and tragicBackstory):
  rerollTerribleCharacter()
.
else:
  console.log('Your character is average...')
.
```

#### Loops
In whiteboard, you are able to use for and foreach loops to iterate over any iterable object. This includes the ordered types lists, dictionaries, sets, stacks, and any UserType that is iterable and ordered.  

```
List colors = List(red, orange, yellow, green, blue, purple)
    for i in range(colors):
        console.log(i)
    .
```

Users are also able to implement while loops:

#### Functions

```
fun helloworld = (num):
    for i in range(num):
        console.log(x)
    .
.
```

```
fun fibonachi_series = (n):
    if (n == 1):
        return List(0, 1)
    .
   else:
        List s = fibonachi_series(n-1)
        s.push((s[(s.length()) - 1]) + (s[(s.length()) - 2]))
        return s
    .
.
```

#### Exceptions
Exceptions are thrown with a `Error` message, shown below:

```
if (num != 42 ):
  Error('This is not the number you are looking for.')
.
```

#### Comments
Single line comments in whiteboard begin with a single hash `#`...

```
# One fish, two fish, red fish, blue fish
```
...while multi-line comments begin and end with a double hash `##`.

```
## If you are reading this: HELP
   I am stuck inside a whiteboard ##
```


### Example Programs

A series of programs in whiteboard with the equivalent Javascript underneath for comparison.

#### whiteboard
```
prime.wb
fun primes = (num):
    Num LARGEST = 100000000000000
    if num < 2 or num > LARGEST:
        throw('Out of range')
    .
    for e in range(2):
        if num mod d == 0:
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
