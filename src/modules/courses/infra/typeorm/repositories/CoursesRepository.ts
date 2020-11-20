import ICreateCourseDTO from '@modules/courses/dtos/ICreateCourseDTO';
import IFindCourseByNameForUser from '@modules/courses/dtos/IFindCourseByNameForUser';
import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import { getRepository, Repository } from 'typeorm';
import Course from '../entities/Course';

class CoursesRepository implements ICoursesRepository {
  private ormRepository: Repository<Course>;

  constructor() {
    this.ormRepository = getRepository(Course);
  }

  public async create({
    user_id,
    name,
    image,
  }: ICreateCourseDTO): Promise<Course> {
    const course = this.ormRepository.create({ user_id, name, image });

    await this.ormRepository.save(course);

    return course;
  }

  public async findAll(): Promise<Course[]> {
    return this.ormRepository.find();
  }

  public async findById(id: string): Promise<Course | undefined> {
    const course = await this.ormRepository.findOne(id);

    return course;
  }

  public async findByName(name: string): Promise<Course | undefined> {
    const course = await this.ormRepository.findOne({
      where: { name },
    });

    return course;
  }

  public async findByNameForUser({
    user_id,
    name,
  }: IFindCourseByNameForUser): Promise<Course | undefined> {
    const course = await this.ormRepository.findOne({
      where: {
        user_id,
        name,
      },
    });

    return course;
  }

  public async save(course: Course): Promise<Course> {
    return this.ormRepository.save(course);
  }
}

export default CoursesRepository;
