class EventEmitter {
    listeners = {};  // key-value pair

    on(eventName, fn) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }

        this.listeners[eventName].push(fn);
    }

    off(eventName, fn) {
        if (this.listeners[eventName]) {
            this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== fn);
        }
    }

    once(eventName, fn) {
        const onceListener = (...args) => {
            fn(...args);
            this.off(eventName, onceListener);
        };

        this.on(eventName, onceListener);
    }

    emit(eventName, ...args) {
        const listeners = this.listeners[eventName];
        if (listeners) {
            for (const listener of listeners) {
                listener(...args);
            }
        }
    }

    listenerCount(eventName) {
        const listeners = this.listeners[eventName];
        return listeners?.length || 0;
    }

    rawListeners(eventName) {
        const listeners = this.listeners[eventName];
        return listeners || []
    }
}

module.exports = EventEmitter;

const myEmitter = new EventEmitter();

function c1() {
    console.log('an event occurred!');
}

function c2() {
    console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
myEmitter.on('status', (code, msg) => console.log(`Got ${code} and ${msg}`));

myEmitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be
// removed/unregistered automatically
myEmitter.emit('eventOnce');

myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init'); // Will not be fired
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.listenerCount('eventOne'));

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the
// emit has been called
console.log(myEmitter.rawListeners('eventOne'));

// Get listener's count after remove one or all listeners of 'eventOne'
myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));