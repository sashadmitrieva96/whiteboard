fun helloworld = (num):
    for i in range(num):
        console.log(x)
    .
.

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