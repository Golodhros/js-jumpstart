// Increment our promise class

// Assumptions
// - only manage resolve
// - valid callback

/*

Requirement
- Executor is executed immediately when pledge instance is created
- If “then” happens before “resolve”, callback will be hold and invoke until pledge is resolved
- If “then” happens after “resolve”, callback will be called immediately with the value

*/

// ========== utils to track and log time ==========
const initialTime = Date.now();
function logAndTrackTime(output) {
    console.log(output, `: happens at ${Date.now() - initialTime}ms`);
}
// ========== utils to track and log time ==========

const STATE_FULLFILLED = "fullfilled";
const STATE_REJECTED = "rejected";
const STATE_PENDING = "pending";

class Pledge {
    successHandlers = [];
    errorHandlers = [];
    // fullfilled, rejected, pending
    state = STATE_PENDING;
    fullfilledValue = null;
    rejectedValue = null;

    constructor(callback) {
        const resolve = (value) => {
            this.state = STATE_FULLFILLED;
            this.fullfilledValue = value;

            this.successHandlers.forEach((fn) => {
                fn(value);
            });
        };

        const reject = (value) => {
            this.state = STATE_REJECTED;
            this.rejectedValue = value;

            this.errorHandlers.forEach((fn) => {
                fn(value);
            });
        };

        callback(resolve, reject);
    }

    then = (successFn, errorFn) => {
        if (this.state === STATE_PENDING) {
            if (successFn) {
                this.successHandlers.push(successFn);
            }
        }

        // Already resolved promises
        if (this.state === STATE_FULLFILLED) {
            successFn(this.fullfilledValue);
        }

        if (errorFn) {
            this.catch(errorFn);
        }

        return this;
    };

    catch = (errorFn) => {
        if (this.state === STATE_PENDING) {
            if (errorFn) {
                this.errorHandlers.push(errorFn);
            }
        }

        // Already rejected promises
        if (this.state === STATE_REJECTED) {
            errorFn(this.rejectedValue);
        }

        return this;
    };
}

const newPledge = new Pledge((resolve) => {
    logAndTrackTime("executor starts running");
    setTimeout(() => {
        logAndTrackTime("resolve pledge");
        resolve("Success!");
    }, 500);
});

logAndTrackTime("call 1st then");
newPledge.then((response) => {
    logAndTrackTime(`1st then callback, ${response}`);
});

logAndTrackTime("call 2nd then");
newPledge.then((response) => {
    logAndTrackTime(`2nd then callback, ${response}`);
});

setTimeout(() => {
    logAndTrackTime("wait for 1000ms, call 3rd then");
    newPledge.then((response) => {
        logAndTrackTime(`3rd then callback, ${response}`);
    });
}, 1000);

const badPledge = new Pledge((resolve, reject) => {
    logAndTrackTime("executor starts running");
    setTimeout(() => {
        logAndTrackTime("reject pledge");
        reject("Fail!");
    }, 500);
});

logAndTrackTime("call 4th then");
badPledge.then(
    (response) => {
        throw new Error("This should not be called");
    },
    (response) => {
        logAndTrackTime(`1st then callback, ${response}`);
    }
);

badPledge.catch((response) => {
    logAndTrackTime(`1st catch callback, ${response}`);
});

const dumbPledge = new Pledge((resolve, reject) => {
    logAndTrackTime("executor starts running");
    setTimeout(() => {
        logAndTrackTime("resolve pledge");
        resolve("Success!");
    }, 500);
});

logAndTrackTime("call 1st and 2nd then");
dumbPledge
    .then((response) => {
        logAndTrackTime(`1st then callback, ${response}`);
    })
    .then((response) => {
        logAndTrackTime(`2nd then callback, ${response}`);
    });
