let arr = [1, 1];
const MAX = 1e6;

const chunkOfWork = j => {
    if (j === 10000) {
        done(); //alert(‘done’)
        return;
    }
    setTimeout(() => {
        for (let i = 2 + j * 100; i < 102 + j * 100; i++) {
            arr.push(arr[i - 1] + arr[i - 2]);
        }
        chunkOfWork(j + 1);
    }, 100);
};

function fibonacci() {
    chunkOfWork(0);
}
