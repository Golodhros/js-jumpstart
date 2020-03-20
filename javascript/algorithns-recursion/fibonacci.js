// Fibonacci Recursive
function fib_recursive(n) {
    if (n === 0) {
        return 0;
    } else if (n === 1){
        return 1;
    } else {
        return fib_recursive(n-1) + fib_recursive(n-2);
    }
}

function fibonacci(n) {
    return fib_recursive(n);
}


// Fibonacci Recursive with Caching
function fib_cached(n, memo) {
    if (memo[n] !== undefined) {
        return memo[n];
    } else {
        memo[n] = fib_cached(n-1, memo) + fib_cached(n-2, memo);

        return memo[n];
    }
}

function fibonacci(n) {
    let memo = {
        0: 0,
        1: 1
    };
    return fib_cached(n, memo);
}


// Fibonacci Dynamic Programming
const MAXN = 45;
const fib_dp = (n) => {
    let i;
    let cache = new Array(MAXN+1);

    cache[0] = 0;
    cache[1] = 1;
    for (i=2; i<=n; i++) {
        cache[i] = cache[i-1] + cache[i-2];
    }
    return(cache[n]);
}


// Optimized Fibonacci
const fib_ultimate = (int n) => {
    let i;
    let back2 = 0,
        back1 = 1;      /* last two values of f[n] */
    let next;           /* placeholder for sum */

    if (n == 0) {return 0};
    for (i=2; i<n; i++) {
        next = back1+back2;
        back2 = back1;
        back1 = next;
    }

    return(back1+back2);
}
