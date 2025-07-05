import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index', {
    title: 'This is an Express app',
    subtitle: 'using EJS as template engine',
  });
});
app.get('/users/me', (req, res) => {
  res.render('index', {
    title: 'This is an Express app',
    subtitle: `You are looking for the current user`,
  });
});
app.get('/users/:id', (req, res) => {
  res.render('index', {
    title: 'This is an Express app',
    subtitle: `You are looking for the user with id ${req.params.id}`,
  });
});
app.get('/films', (req, res) => {
  const { category, director } = req.query;
  res.send(
    `You are looking for films with category ${category} and director ${director}`
  );
});
app.get(/reg\/.*fly\/.*$/, (req, res) => {
  res.render('index', {
    title: 'This is an Express app',
    subtitle: 'Match with any route that ends with fly',
  });
});
app.get('/redirect', (req, res) => {
  res.send('Redirect Root Page');
});
app.get('/redirect/go', (req, res) => {
  res.redirect('/users/peter');
});
app.get('/redirect/goforward', (req, res) => {
  res.redirect('./goforward/forward');
});
app.get('/get/file', (req, res) => {
  res.sendFile(path.join(__dirname, 'package.json'));
});
app.get('/get/attachment', (req, res) => {
  res.download(path.join(__dirname, 'package.json'));
});

app.listen(port, () => {
  console.log(`Application running on http://localhost:${port}`);
});
