export const APP_URL = `http://localhost:3000`;
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  const app = APP_URL;

  it('/ (GET)', () => {
    return request(app).get(`/`).expect(200);
  });
});
