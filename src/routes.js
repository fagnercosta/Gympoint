import { Router } from 'express';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import PlanController from './app/controllers/PlanController';
import authMidleware from './app/middlewares/auth';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';

const routes = new Router();

routes.post('/sessions', SessionController.store);
// Checkin
routes.post('/checkins', CheckinController.store);

// Crud de Students
routes.use(authMidleware);
routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);
routes.put('/students/', StudentController.updtate);
routes.post('/users', UserController.store);

// Plan
routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

// Matriculas
routes.get('/enrollments', EnrollmentController.index);
routes.post('/enrollments', EnrollmentController.store);

export default routes;
