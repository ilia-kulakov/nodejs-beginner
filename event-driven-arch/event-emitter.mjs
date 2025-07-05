import { EventEmitter } from 'node:events';

const emitter = new EventEmitter();

emitter.on('message', (message) => {
  console.log(`Message received: ${message}`);
});

emitter.emit('message', 'Hello Node.js Emitter!');

setInterval(() => {
  emitter.emit('message', `Interval (${Date.now()})`);
}, 1000);

emitter.on('message', (message) => {
  console.log(`Additional listener received: ${message}`);
});

emitter.once('message', (message) => {
  console.log(`Once listener received: ${message}`);
});

setTimeout(() => {
  emitter.emit('message', 'Timeout says hello!');
}, 2500);
