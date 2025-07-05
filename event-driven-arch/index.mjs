import { on, save } from './utils.mjs';

on('file:saved', ({ location, data }) => {
  console.log(`File saved at ${location}`);
});

console.log('Saving file...');
save('test.txt', 'Hello Node.js!').catch((error) =>
  console.error('Error saving file: ', error)
);
console.log('The file is being saved but is not blocking the execution...');
