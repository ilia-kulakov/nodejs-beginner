import express from 'express';
import bodyParser from 'body-parser';
import { getAll, getById, create, updateById, deleteById } from './store.js';

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/about', async (req, res) => {
  const whispers = await getAll();
  res.render('about', { whispers });
});

app.get('/api/v1/whisper', async (req, res) => {
  const whispers = await getAll();
  res.json(whispers);
});

app.get('/api/v1/whisper/:id', async (req, res) => {
  console.log(`/api/v1/whisper/:id: ${req.params.id}`);
  const id = parseInt(req.params.id);
  console.log(`:id: ${id}`);
  const whisper = await getById(id);
  console.log(whisper);
  if (!whisper) {
    res.sendStatus(404);
  } else {
    res.json(whisper);
  }
});

app.post('/api/v1/whisper', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    res.sendStatus(400);
  } else {
    const whisper = await create(message);
    res.status(201).json(whisper);
  }
});

app.put('/api/v1/whisper/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { message } = req.body;

  if (!message) {
    res.sendStatus(400);
  } else {
    const whisper = await getById(id);
    if (!whisper) {
      res.sendStatus(404);
    } else {
      await updateById(id, message);
      res.sendStatus(200);
    }
  }

  res.sendStatus(200);
});

app.delete('/api/v1/whisper/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const whisper = await getById(id);
  if (!whisper) {
    res.sendStatus(404);
    return;
  }
  await deleteById(id);
  res.sendStatus(200);
});

export { app };
