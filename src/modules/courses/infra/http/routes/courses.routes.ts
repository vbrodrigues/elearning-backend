import useAuthentication from '@shared/infra/http/middlewares/useAuthentication';
import { Router } from 'express';
import CoursesController from '../controllers/CoursesController';

const coursesRouter = Router();

coursesRouter.use(useAuthentication);

const coursesController = new CoursesController();

coursesRouter.post('/', coursesController.create);

export default coursesRouter;
