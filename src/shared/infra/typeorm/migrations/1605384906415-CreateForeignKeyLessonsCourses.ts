import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export default class CreateForeignKeyLessonsCourses1605384906415 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createForeignKey('lessons', new TableForeignKey({
        name: 'LessonCourse',
        columnNames: ['course_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'courses',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('lessons', 'LessonCourse')
    }

}
