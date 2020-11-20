import useAuthentication from '@shared/infra/http/middlewares/useAuthentication';
import { Router } from 'express';
import LessonsController from '../controllers/LessonsController';

const lessonsRouter = Router();

lessonsRouter.use(useAuthentication);

const lessonsController = new LessonsController();

lessonsRouter.post('/', lessonsController.create);

lessonsRouter.post('/:lesson_id', lessonsController.update);

export default lessonsRouter;
