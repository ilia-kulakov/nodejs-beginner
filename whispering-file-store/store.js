import fs from 'node:fs/promises';
import path from 'node:path';

const filename = path.join(process.cwd(), 'db.json');

const saveChanges = (data) => fs.writeFile(filename, JSON.stringify(data));

const readData = async () => {
  const data = await fs.readFile(filename, { encoding: 'utf8' });
  return JSON.parse(data);
};

const getAll = readData;

const getById = async (id) => {
  const data = await readData();
  return data.find((item) => item.id === id);
};

const create = async (message) => {
  const data = await readData();
  const maxId = data
    .map((item) => item.id)
    .reduce((acc, cur) => (acc > cur ? acc : cur), 0);

  const newItem = { message, id: maxId + 1 };
  await saveChanges(data.concat([newItem]));
  return newItem;
};

const updateById = async (id, message) => {
  const data = await readData();
  const modifiedData = data.map((item) => {
    if (item.id === id) {
      return { ...item, message };
    }

    return item;
  });
  await saveChanges(modifiedData);
};

const deleteById = async (id) => {
  const data = await readData();
  await saveChanges(data.filter((item) => item.id !== id));
};

export { getAll, getById, create, updateById, deleteById };
