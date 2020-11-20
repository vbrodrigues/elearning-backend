import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Lesson from '../infra/typeorm/entities/Lesson';
import ILessonsRepository from '../repositories/ILessonsRepository';

interface IRequest {
  lesson_id: string;
  course_id: string;
  user_id: string;
  name: string;
  duration: number;
  description: string;
  video_id: string;
}

@injectable()
class UpdateLessonService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,

    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({
    lesson_id,
    course_id,
    user_id,
    name,
    duration,
    description,
    video_id,
  }: IRequest): Promise<Lesson> {
    const lesson = await this.lessonsRepository.findById(lesson_id);

    if (!lesson) {
      throw new AppError('Lesson not found.');
    }

    if (lesson.course_id !== course_id) {
      throw new AppError('This lesson was not found on this course.');
    }

    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      throw new AppError('Course not found.');
    }

    if (course.user_id !== user_id) {
      throw new AppError('This course is not owned by the authenticated user.');
    }

    lesson.name = name;
    lesson.duration = duration;
    lesson.description = description;
    lesson.video_id = video_id;

    return this.lessonsRepository.save(lesson);
  }
}

export default UpdateLessonService;
