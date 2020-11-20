import ICreateLessonDTO from '@modules/lessons/dtos/ICreateLessonDTO';
import IFindByNameForCourse from '@modules/lessons/dtos/IFindByNameForCourseDTO';
import ILessonsRepository from '@modules/lessons/repositories/ILessonsRepository';
import { getRepository, Repository } from 'typeorm';
import Lesson from '../entities/Lesson';

class LessonsRepository implements ILessonsRepository {
  private ormRepository: Repository<Lesson>;

  constructor() {
    this.ormRepository = getRepository(Lesson);
  }

  public async create({
    name,
    duration,
    course_id,
    description,
    video_id,
  }: ICreateLessonDTO): Promise<Lesson> {
    const lesson = this.ormRepository.create({
      name,
      duration,
      course_id,
      description,
      video_id,
    });

    await this.ormRepository.save(lesson);

    return lesson;
  }

  public async findById(id: string): Promise<Lesson | undefined> {
    const lesson = await this.ormRepository.findOne(id);
    return lesson;
  }

  public async findByNameForCourse({
    name,
    course_id,
  }: IFindByNameForCourse): Promise<Lesson | undefined> {
    const lesson = await this.ormRepository.findOne({
      where: {
        course_id,
        name,
      },
    });

    return lesson;
  }

  public async save(lesson: Lesson): Promise<Lesson> {
    return this.ormRepository.save(lesson);
  }
}

export default LessonsRepository;
