/*

input.addEventListener('keydown', search);

// keydown     | |      |
// time     ---------------->
// search      | |      |

input.addEventListener('keydown', debounce(search, 100));

// keydown    | |      |
// time     ---------------->
// search           |      |
//              |100|  |100|

*/

// Debounce function
// Wait the delay until we fire it again
const debounce = (cb, delay) => {
  let timeoutId;

  return (...args) => {
      clearTimeouts(timeoutId);

      timeoutId = setTimeout(() => {
        cb.apply(this, args);
      }, delay);
  };
};

const throttle = (cb, delay) => {
  let isRunning = true;

  return () => {
      if(isRunning) {
        setTimeout(() => {
          cb();
          isRunning = true;
        }, delay);

        isRunning = false;
      }
  };
};