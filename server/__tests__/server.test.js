import request from 'supertest';
import app from '../server.js'

describe('Chat API', () => {
  it('GET /hello should return greeting', async () => {
    const res = await request(app).get('/hello');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hello from the backend');
  });

  it('GET /api/chat should return an array', async () => {
    const res = await request(app).get('/api/chat');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/chat should add a new message', async () => {
    const newMessage = {
      user: 'TestUser',
      message: 'Hello, test!',
      timestamp: new Date(),
    };
    const res = await request(app)
      .post('/api/chat')
      .send(newMessage)
      .set('Content-Type', 'application/json');
    expect(res.statusCode).toBe(200); // Or 201 if you use that
    // Optionally check response body
  });
});