// Measure input latency with
// event.timeStamp and performance.now()
// Ref: https://www.youtube.com/watch?v=6Ljq-Jn-EgU

const subscribeBtn = document.querySelector('#subscribe');

subscribeBtn.addEventListener('click', (event) => {
    // Event listener goes here...

    const lag = performance.now() - event.timeStamp;
    if (lag > 100) {
        sendDataToAnalytics('Input latency', lag);
    }
});