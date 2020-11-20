import CreateLessonService from '@modules/lessons/services/CreateLessonService';
import UpdateLessonService from '@modules/lessons/services/UpdateLessonService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class LessonsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, duration, course_id, description, video_id } = request.body;
    const user_id = request.user.id;

    const createLesson = container.resolve(CreateLessonService);

    const lesson = await createLesson.execute({
      name,
      duration,
      course_id,
      description,
      video_id,
      user_id,
    });

    return response.json(lesson);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { lesson_id } = request.params;
    const user_id = request.user.id;
    const { name, course_id, duration, description, video_id } = request.body;

    const updateLesson = container.resolve(UpdateLessonService);

    const lesson = await updateLesson.execute({
      lesson_id,
      course_id,
      user_id,
      name,
      duration,
      description,
      video_id,
    });

    return response.json(lesson);
  }
}
