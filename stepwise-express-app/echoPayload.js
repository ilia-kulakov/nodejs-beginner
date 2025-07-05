import express from 'express';
import bodyParser from 'body-parser';

const port = 3000;
const app = express();

app.use(bodyParser.json());

app.post('/echo', (req, res) => {
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
