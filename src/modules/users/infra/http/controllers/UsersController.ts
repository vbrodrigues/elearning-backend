import CreateUserService from '@modules/users/services/CreateUserService';
import ListAllUsersService from '@modules/users/services/ListAllUsersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListAllUsersService);

    const users = await listUsers.execute();

    return response.json(users);
  }
}
