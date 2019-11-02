import { Router } from 'express';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import authMidleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/students', StudentController.store);

routes.post('/sessions', SessionController.store);

routes.post('/teste', authMidleware, (req, res) => {
  return res.json({ error: 'Deu certo' });
});

export default routes;
