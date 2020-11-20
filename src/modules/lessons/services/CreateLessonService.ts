import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Lesson from '../infra/typeorm/entities/Lesson';
import ILessonsRepository from '../repositories/ILessonsRepository';

interface IRequest {
  name: string;
  duration: number;
  course_id: string;
  description: string;
  video_id: string;
  user_id: string;
}

@injectable()
class CreateLessonService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,

    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({
    name,
    duration,
    course_id,
    description,
    video_id,
    user_id,
  }: IRequest): Promise<Lesson> {
    const findLesson = await this.lessonsRepository.findByNameForCourse({
      name,
      course_id,
    });

    if (findLesson) {
      throw new AppError('This course already has a lesson with this name.');
    }

    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      throw new AppError('Course not found.');
    }

    if (course.user_id !== user_id) {
      throw new AppError('This course is not owned by the authenticated user.');
    }

    const lesson = await this.lessonsRepository.create({
      name,
      duration,
      course_id,
      description,
      video_id,
    });

    return lesson;
  }
}

export default CreateLessonService;
