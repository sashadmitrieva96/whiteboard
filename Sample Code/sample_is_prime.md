<pre>
Prime.wb
fun _primes = (_num):
   Num _LARGEST = 100000000000000
    if _num < 2 or _num > _LARGEST:
        _throw('Out of range')
    .
    for _e in _range(2):
        if _num mod _d == 0:
            return false
        .
    .
    return true
.
</pre>

<pre>
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
</pre>
