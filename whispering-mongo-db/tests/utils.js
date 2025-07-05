import mongoose from 'mongoose';
import { Whisper } from '../database.js';

const ensureDbConnection = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

const closeDbConnection = async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }
};

const normalize = (data) => JSON.parse(JSON.stringify(data));
const restoreDb = () => Whisper.deleteMany({});
const populateDb = () =>
  Whisper.insertMany([{ message: 'test' }, { message: 'hello' }]);
const getFixtures = async () => {
  const data = await Whisper.find();
  const whispers = normalize(data);
  const inventedId = '7868e2d8725b12a9c97345f9';
  const existingId = data[0].id;
  return { inventedId, existingId, whispers };
};

export {
  restoreDb,
  populateDb,
  getFixtures,
  ensureDbConnection,
  normalize,
  closeDbConnection,
};
