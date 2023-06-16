/* Promises

const happyPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("All good!");
  }, 2000);
});
happyPromise.then(function (fullfilledValue) {
  console.log("then", fullfilledValue);
});

const sadPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("All bad!");
  }, 2000);
});
sadPromise.then(
  function (fullfilledValue) {
    console.log("not supposed to trigger");
  },
  function (errorValue) {
    console.log("then", errorValue);
  }
);
*/

const STATES = {
    PENDING: "PENDING",
    FULLFILLED: "FULLFILLED",
    REJECTED: "REJECTED",
};

class Future {
    state = STATES.PENDING;
    successHandlers = [];
    rejectionHandlers = [];
    fullfilledValue = null;
    rejectedValue = null;

    constructor(callback) {
        const resolve = (value) => {
            this.fullfilledValue = value;
            this.state = STATES.FULLFILLED;

            this.successHandlers.forEach((handler) => {
                handler(value);
            });
        };
        const reject = (value) => {
            this.rejectedValue = value;
            this.state = STATES.REJECTED;

            this.rejectionHandlers.forEach((handler) => {
                handler(value);
            });
        };

        callback(resolve, reject);
    }

    then(successFn, errorFn) {
        if (this.state === STATES.FULLFILLED) {
            successFn(this.fullfilledValue);
        }

        if (this.state === STATES.PENDING) {
            this.successHandlers.push(successFn);
        }

        if (errorFn) {
            this.catch(errorFn);
        }

        return this;
    }

    catch(errorFn) {
        if (this.state === STATES.REJECTED) {
            errorFn(this.rejectedValue);
        }
        if (this.state === STATES.PENDING) {
            this.rejectionHandlers.push(errorFn);
        }

        return this;
    }
}

const happyPromise = new Future((resolve) => {
    setTimeout(() => {
        resolve("All good!");
    }, 2000);
});
happyPromise.then(function (fullfilledValue) {
    console.log("then", fullfilledValue);
});

const sadPromise = new Future((resolve, reject) => {
    setTimeout(() => {
        reject("All bad!");
    }, 2000);
});
sadPromise.then(
    function (fullfilledValue) {
        console.log("not supposed to trigger");
    },
    function (errorValue) {
        console.log("then", errorValue);
    }
);

// Promise.all
