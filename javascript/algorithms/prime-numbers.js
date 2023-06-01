// The naive way to check is to iterate from 2 through n-1, checking for divisibility on each iteration:
const primeNaive = (n) => {
    if (n < 2) {
        return false;
    }
    for (let i = 2; i <= n; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
};

// A small but important improvement is to iterate only up through the square root of n:
// If n is divisible by a number greater than its square root then it's divisible by something smaller than it.
const primeBetter = (n) => {
    if (n < 2) {
        return false;
    }

    let sqrt = Math.sqrt(n);
    for (let i = 2; i <= sqrt; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
};

// Sieve of Eratosthenes
const crossOff = (flags, prime) => {
    for (let i = prime * prime; i < flags.length; i += prime) {
        flags[i] = false;
    }
};

const getNextPrime = (flags, prime) => {
    let next = prime + 1;

    while (next < flags.length && !flags[next]) {
        next++;
    }
    return next;
};

const sieveOfEratosthenes = (max) => {
    let flags = new Array(max + 1).fill(true);
    let count = 0;

    flags[0] = false;
    flags[1] = true;

    let prime = 2;

    while (prime <= Math.sqrt(max)) {
        crossOff(flags, prime);

        prime = getNextPrime(flags, prime);
    }

    return flags
        .map((item, index) => (item ? index : null))
        .filter((item) => !!item);
};
