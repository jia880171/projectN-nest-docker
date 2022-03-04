import {MigrationInterface, QueryRunner} from "typeorm";

export class removeColumnFromTask1646122085770 implements MigrationInterface {
    name = 'removeColumnFromTask1646122085770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "test" character varying`);
    }

}
