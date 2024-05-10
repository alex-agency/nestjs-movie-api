import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1715365562057 implements MigrationInterface {
  name = 'Migration1715365562057';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "genre" ("name" character varying NOT NULL, CONSTRAINT "PK_dd8cd9e50dd049656e4be1f7e8c" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dd8cd9e50dd049656e4be1f7e8" ON "genre" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "movie" ("title" character varying NOT NULL, "description" character varying NOT NULL, "releaseDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a81090ad0ceb645f30f9399c347" PRIMARY KEY ("title"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a81090ad0ceb645f30f9399c34" ON "movie" ("title") `,
    );
    await queryRunner.query(
      `CREATE TABLE "movie_genres_genre" ("movieTitle" character varying NOT NULL, "genreName" character varying NOT NULL, CONSTRAINT "PK_903b23462fd84411714dbbb879c" PRIMARY KEY ("movieTitle", "genreName"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ac95676457064da4442880adb5" ON "movie_genres_genre" ("movieTitle") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e06f0a4a429c8344d2623873a4" ON "movie_genres_genre" ("genreName") `,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres_genre" ADD CONSTRAINT "FK_ac95676457064da4442880adb54" FOREIGN KEY ("movieTitle") REFERENCES "movie"("title") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres_genre" ADD CONSTRAINT "FK_e06f0a4a429c8344d2623873a4d" FOREIGN KEY ("genreName") REFERENCES "genre"("name") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie_genres_genre" DROP CONSTRAINT "FK_e06f0a4a429c8344d2623873a4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres_genre" DROP CONSTRAINT "FK_ac95676457064da4442880adb54"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e06f0a4a429c8344d2623873a4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ac95676457064da4442880adb5"`,
    );
    await queryRunner.query(`DROP TABLE "movie_genres_genre"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a81090ad0ceb645f30f9399c34"`,
    );
    await queryRunner.query(`DROP TABLE "movie"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dd8cd9e50dd049656e4be1f7e8"`,
    );
    await queryRunner.query(`DROP TABLE "genre"`);
  }
}
