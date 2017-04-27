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