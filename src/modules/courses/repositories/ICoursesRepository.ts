import ICreateCourseDTO from '../dtos/ICreateCourseDTO';
import IFindCourseByNameForUser from '../dtos/IFindCourseByNameForUser';
import Course from '../infra/typeorm/entities/Course';

export default interface ICoursesRepository {
  save(course: Course): Promise<Course>;
  create(data: ICreateCourseDTO): Promise<Course>;
  findById(id: string): Promise<Course | undefined>;
  findByName(name: string): Promise<Course | undefined>;
  findByNameForUser(
    data: IFindCourseByNameForUser,
  ): Promise<Course | undefined>;
}
