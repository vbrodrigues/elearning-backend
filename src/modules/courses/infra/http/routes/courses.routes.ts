import useAuthentication from '@shared/infra/http/middlewares/useAuthentication';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import CoursesController from '../controllers/CoursesController';

const coursesRouter = Router();

coursesRouter.use(useAuthentication);

const coursesController = new CoursesController();

coursesRouter.get('/', coursesController.show);

coursesRouter.get('/:course_id/lessons', coursesController.index);

coursesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      image: Joi.string().required(),
    },
  }),
  coursesController.create,
);

coursesRouter.put(
  '/:course_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      image: Joi.string(),
    },
  }),
  coursesController.update,
);

export default coursesRouter;
