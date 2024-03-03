import { expect, test, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../app'

beforeAll(async () => {
  await app.ready()
});

afterAll(async () => {
  await app.close()
});
