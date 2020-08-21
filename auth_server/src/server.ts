import express from 'express';
import { router } from './routes';
import './database';
import 'reflect-metadata';

const app = express();

app.use(express.json());
app.use(router);

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});