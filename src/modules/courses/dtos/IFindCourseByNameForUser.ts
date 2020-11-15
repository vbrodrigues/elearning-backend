import { string } from '@hapi/joi';

export default interface IFindCourseByNameForUser {
  user_id: string;
  name: string;
}
