import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Course from '../infra/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

interface IRequest {
  user_id: string;
  name: string;
  image: string;
}

@injectable()
class CreateCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) { }

  public async execute({ user_id, name, image }: IRequest): Promise<Course> {
    const findCourse = await this.coursesRepository.findByNameForUser({
      user_id,
      name,
    });

    if (findCourse) {
      throw new AppError('This user already has a course with this name.');
    }

    const course = await this.coursesRepository.create({
      user_id,
      name,
      image,
    });

    return course;
  }
}

export default CreateCourseService;
