# whiteboard
a whiteboard for the world to write on

![](https://raw.githubusercontent.com/sashadmitrieva96/whiteboard/7a658e4333df880ef0e5671eb1148dec055ffe19/Logo%20Ideas/wb_logo.png)

whiteboard is an easy-to-learn scripting language that compiles to Javascript, made with the intent of introducing programming syntax to first-time users.

## Whiteboard setup guide
This is a guide on how to setup the whiteboard compiler to function on your machine.

### Step 1
First clone the repository and npm install.

```

git clone https://github.com/sashadmitrieva96/whiteboard.git
npm install
```

### Step 2
Write out your whiteboard code and save it in .wb format.

**MUST HAVE LF LINE**
Currently the compiler only accepts LF line endings so make sure whichever text editor you are using has the correct configuration. If your text editor is not set to have LF line endings, you must make this change or else your code will not compile.

### Step 3
Compile your code.
```

whiteboard <YOUR FILE NAME HERE>.wb
```

This will generate a Javascript file that can be executed.

**EXAMPLE**
```

node <YOUR FILE NAME HERE>.js
```


### Grammar
#### Macrosyntax

```
WhiteBoard  {

  Program     =  Statement*

  Statement   =  If                                         --if
              |  For                                        --for
              |  Return                                     --ret
              |  Decl                                       --decl
              |  Break                                      --break
              |  Exp                                        --exp

  Decl        =  FunDecl                                    --fun
              |  ObjDecl                                    --obj
              |  type? Exp ("=" Exp)?                       --norm
  FunDecl     =  type? id "=" Param ":" Block

  ObjDecl     =  "Type" id "=" Param ":" Block

  Dict        =  Exp ":" Exp

  Return      =  "return" Exp
  Break       =  "break"
  For         =  "for" id "in" Exp ":" Block

  If          =  "if" Exp ":" Block
                 ("else" "if" Exp ":" Block)*
                 ("else" ":" Block)?


  Block       =  Statement* "."

  Exp         =  And
  Param       =  "(" (SParam ("," SParam)*)?  ")"

  SParam      =  Dict                                       --Dict
              |  type id                                    --type
              |  id                                         --notype


  Args        =  "(" (Exp ("," Exp)*)?  ")"                 --exp
              |  "(" (Dict ("," Dict)*)?  ")"               --named
  Access      =  "." id                                     --lit
              |  "[" Exp "]"                                --exp

  And         =  And "and" Or                               --bin
              |  Or
  Or          =  Or "or" Rel                                --bin
              |  Rel
  Rel         =  Term relop Term                            --bin
              |  Term

  Term        =  Term addop Fact                            --bin
              |  Fact
  Fact        =  Fact  mulop Neg                            --bin
              |  Neg

  Neg         = "-" Power                                   --neg
              | Power

  Power       =  Power powop Exp2                           --bin
              |  Exp2

  Exp2        =  Exp2 Args                                  --call
              |  Exp2 Access                                --acc
              |  Primary                                    --prim

  Primary     =  numlit | boolit | strlit | id
              |  "(" Exp ")"                                --exp


  type        =  upper(idrest)*

  numlit      =  digit+ ("." digit+)?                       --whole
              |  "." digit+                                 --dec
  boolit      =  "true" | "false"
  strlit      =  "'" ( ~"'" any )* "'"



  boolop      =  "and" | "or"
  relop       =  ">=" | ">" | "<=" | "<" | "!=" | "=="

  powop       =  "**"
  mulop       =  "*" | "/" | "%"
  addop       =  "+" | "-"

  keyword     =  ("fun" | "for" | "in" | "return" | "break" | "or" | "and" | "if" | "else" | "mod" | "return") ~idrest


  id          =  ~keyword(letter)idrest*
  idrest      =  letter | digit

}
```

#### List of semantic error checks
```

1) Incompatible types
2) Cannot read property of undefined
3) Cannot read property 'type' of null
4) Undeclared id
5) Excess parameters
6) id has already been declared
7) Cannot repeat argument names
8) Callee is not rest capable
9) Cannot bind values in rest
10) Parameter matched multiple times
11) Parameter not found
13) Parameter not assigned value
14) Other has no type
15) Not a function
```

### Features

#### Variable Assignment and Declarations


#### Types and Objects

In whiteboard, types are essentially objects. Some built-in types are **String**, **Num**, **Bool**, **Dict**, **List**, **Set**, and **Stack**.

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
Type Cat = (l, p):
    legs = l
    paws = p
    walk = (steps):
        return steps / 4
    .
.
```

#### If Statements

```
bool tragicBackstory = false

if (roll > 19 or (perception == 20 and intellegence >= 18)):
  rerollOPCharacter()
.
else if (roll < 5 and tragicBackstory):
  rerollTerribleCharacter()
.
else:
  print('Your character is average...')
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

#### Whiteboard
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
#### Whiteboard
```
life.wb
fun die = (String life):
  return (life +  " is dead").

fun howsLife = (Bool myLife, List shoppingList):
    for(item in shoppingList):
        if (item == potatoes and myLife == true):
            return "Alive"
            .
    .
die("Potato").
```
#### Javascript

```
function die = (var life){
  return life +  " is dead";
}

function howsLife(var myLife, var shoppingList) {
    for(items in shopping){
        if (items == potatoes && myLife == true){
            return "Alive";
        }
    }
die("Potato");
}
```
