import ICreateLessonDTO from '../dtos/ICreateLessonDTO';
import IFindByNameForCourse from '../dtos/IFindByNameForCourseDTO';
import Lesson from '../infra/typeorm/entities/Lesson';

export default interface ILessonsRepository {
  save(lesson: Lesson): Promise<Lesson>;
  create(data: ICreateLessonDTO): Promise<Lesson>;
  findById(id: string): Promise<Lesson | undefined>;
  findByNameForCourse(data: IFindByNameForCourse): Promise<Lesson | undefined>;
}
