import { Router } from 'express';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/students', StudentController.store);

routes.post('/sessions', SessionController.store);

export default routes;
