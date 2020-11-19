import CreateCourseService from '@modules/courses/services/CreateCourseService';
import UpdateCourseService from '@modules/courses/services/UpdateCourseService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CoursesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, image } = request.body;
    const user_id = request.user.id;

    const createCourse = container.resolve(CreateCourseService);

    const course = await createCourse.execute({ user_id, name, image });

    return response.json(course);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;
    const { name, image } = request.body;

    const updateCourse = container.resolve(UpdateCourseService);

    const course = await updateCourse.execute({ id, user_id, name, image });

    return response.json(course);
  }
}
