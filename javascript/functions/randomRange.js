/**
 * Provides a random integer between min and max (max not included)
 * @param  {Number} min Minimum boundary (included)
 * @param  {Number} max Maximum boundary (not included)
 * @return {Number}     Random generated number
 */
const random = (min, max) => {
    return ~~(Math.random() * (max-min) + min);
}

// random(1, 500) => 182
// random(1, 5) => 1 || 2 || 3 || 4