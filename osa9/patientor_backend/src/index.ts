import express from 'express';
import DiagnoseRouter from './routers/diagnoses';
import PersonRouter from './routers/patients';
const app = express();
const cors = require('cors'); //eslint-disable-line
app.use(cors()); //eslint-disable-line
app.use(express.json());


const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('PONG');
});

app.use('/api/diagnoses', DiagnoseRouter);
app.use('/api/patients', PersonRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});