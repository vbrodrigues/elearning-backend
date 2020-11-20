import Lesson from '@modules/lessons/infra/typeorm/entities/Lesson';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICoursesRepository from '../repositories/ICoursesRepository';

@injectable()
class ListCourseLessonsService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute(course_id: string): Promise<Lesson[]> {
    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      throw new AppError('Course not found.');
    }

    const { lessons } = course;

    return lessons;
  }
}

export default ListCourseLessonsService;
