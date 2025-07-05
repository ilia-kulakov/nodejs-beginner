import express from 'express';

const app = express();
const port = 3000;

app.get('/next-error', (req, res, next) => {
  next(new Error('Ohh! Somthing went wrong at /next-error'));
});

app.get('/throw-error', (req, res) => {
  throw new Error('Ohh! Somthing went wrong at /throw-error');
});

app.use((err, req, res, next) => {
  console.error('Middle Error Handler');
  console.error(err.stack);
  next(err);
});

app.use((err, req, res, next) => {
  console.error('Final Error Handler');
  console.error(err.stack);
  res.status(500).send('Ohh! Server needs love. ' + err);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
