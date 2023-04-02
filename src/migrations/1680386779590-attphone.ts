import { MigrationInterface, QueryRunner } from "typeorm";

export class attphone1680386779590 implements MigrationInterface {
    name = 'attphone1680386779590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "telephone" TO "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "phone" TO "telephone"`);
    }

}
