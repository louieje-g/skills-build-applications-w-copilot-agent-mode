import express from 'express';
import apiRouter from './api';
import { getBaseUrl } from './config/baseUrl';
import './config/database';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/', (_req, res) => {
  res.status(200).json({
    service: 'octofit-backend',
    apiRoot: `${getBaseUrl()}/api`,
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port} at ${getBaseUrl()}`);
});
