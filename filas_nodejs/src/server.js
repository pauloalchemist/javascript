import 'dotenv/config';
import express from 'express';
import UserController from './app/controller/UserController';
import BullBoard from 'bull-board';
import Queue from './app/lib/Queue';

const app = express();
BullBoard.setQueues(Queue.queues.map(queue => queue.bull));

app.use(express.json());
app.use('/admin/queues', BullBoard.UI);

app.post('/users', UserController.store);

app.listen(8080, () => {
  console.log('Server running on 🚪: 8080.');
});