const EventEmitter = require('./eventEmitter');
const https = require('https');

class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        try {
            console.log("Execution started.");
            this.emit('begin');

            const startTime = new Date();
            const result = await asyncFunc(...args);
            const endTime = new Date();

            this.emit('end');
            console.log("Execution finished.");

            this.emit('data', result);
            console.log('Data emitted:', result);

            console.log("Time spent:", endTime - startTime, "ms");
        } catch (e) {
            console.error('Error:',e.message)
        }
    }

    rawListeners(eventName) {
        return super.rawListeners(eventName);
    }
}

const fetchData = async (url) =>
  new Promise((resolve, reject) => {
      https.get(url, (response) => {
          let data = '';

          response.on('data', (chunk) => {
              data += chunk;
          });

          response.on('end', () => {
              resolve(JSON.parse(data));
          });

          response.on('error', (error) => {
              reject(error);
          });
      })
  })

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

console.log(withTime.rawListeners("end"));

withTime.execute(
  fetchData,
   "https://jsonplaceholder.typicode.com/posts/1"
);
