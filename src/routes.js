import { Router } from 'express';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import authMidleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

// Crud de Students
routes.use(authMidleware);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.updtate);

export default routes;
