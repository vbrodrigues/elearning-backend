import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import coursesRouter from '@modules/courses/infra/http/routes/courses.routes';
import lessonsRouter from '@modules/lessons/infra/http/routes/lessons.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/courses', coursesRouter);
routes.use('/lessons', lessonsRouter);

export default routes;
