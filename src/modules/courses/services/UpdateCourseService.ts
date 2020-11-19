import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Course from '../infra/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

interface IRequest {
  id: string;
  user_id: string;
  name?: string;
  image?: string;
}

@injectable()
class UpdateCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    user_id,
    name,
    image,
  }: IRequest): Promise<Course> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const course = await this.coursesRepository.findById(id);

    if (!course) {
      throw new AppError('Course not found.');
    }

    if (course.user_id !== user_id) {
      throw new AppError('This course is not owned by the authenticated user.');
    }

    course.name = name || course.name;
    course.image = image || course.image;

    return this.coursesRepository.save(course);
  }
}

export default UpdateCourseService;
