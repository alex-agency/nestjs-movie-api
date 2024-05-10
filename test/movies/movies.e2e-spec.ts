export const APP_URL = `http://localhost:3000`;
import * as request from 'supertest';

describe('Movies Module', () => {
  const app = APP_URL;

  describe('Create', () => {
    it('should fail to create new movie: /movies (POST)', () => {
      return request(app).post(`/movies`).send({ title: 'fail' }).expect(500);
    });

    it('should successfully create new movie: /movies (POST)', () => {
      return request(app)
        .post(`/movies`)
        .send({
          title: 't1',
          description: 't1_desc',
          releaseDate: new Date(),
          genres: ['g1'],
        })
        .expect(201);
    });
  });
});
