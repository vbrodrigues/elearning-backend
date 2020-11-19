import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import useAuthentication from '@shared/infra/http/middlewares/useAuthentication';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.get('/', useAuthentication, usersController.show);

export default usersRouter;
