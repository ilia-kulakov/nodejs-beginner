import { Whisper } from './database.js';

const getAll = () => Whisper.find();

const getById = (id) => Whisper.findById({ _id: id });

const create = async (message) => {
  const newWhisper = Whisper.create({ message });
  (await newWhisper).save();
  return newWhisper;
};

const updateById = async (id, message) =>
  Whisper.findOneAndUpdate({ _id: id }, { message }, { new: false });

const deleteById = async (id) => Whisper.deleteOne({ _id: id });

export { getAll, getById, create, updateById, deleteById };
