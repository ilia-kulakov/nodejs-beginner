import { writeFile } from 'node:fs/promises';
import { EventEmitter } from 'node:events';

const emitter = new EventEmitter();
const on = emitter.on.bind(emitter);
const save = async (location, data) => {
  await writeFile(location, data);
  emitter.emit('file:saved', { location, data });
  throw new Error('#Artificial ERROR!');
};

export { on, save };
