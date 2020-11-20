import { inject, injectable } from 'tsyringe';
import Course from '../infra/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

@injectable()
class ListCoursesService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepositoru: ICoursesRepository,
  ) {}

  public async execute(): Promise<Course[]> {
    const courses = this.coursesRepositoru.findAll();

    return courses;
  }
}

export default ListCoursesService;
