const startTime = Date.now();

function loadImage(url) {
  console.log(`Starting to load ${url}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(() =>
        console.log(`Finished loading url: ${url} at ${Date.now() - startTime}`)
      );
    }, 2000);
  });
}

// Loads resources one at a time in the order they were requested
class SerialLoader {
  loadQueue = [];

  loading = false;

  loadNextResource() {
    if (!this.loadQueue.length) return;

    this.loading = true;
    console.log(this.loadQueue);

    const resource = this.loadQueue.shift();
    console.log(this.loadQueue);

    loadImage(resource).then(() => {
      this.loading = false;

      if (this.loadQueue.length) {
        this.loadNextResource();
      }
    });
  }

  addRequest(url) {
    this.loadQueue.push(url);

    if (!this.loading) {
      this.loadNextResource();
    }
  }
}

const myLoader = new SerialLoader();

myLoader.addRequest("http://www.netflix.com/resource1");
myLoader.addRequest("http://www.netflix.com/resource2");
myLoader.addRequest("http://www.netflix.com/resource3");
