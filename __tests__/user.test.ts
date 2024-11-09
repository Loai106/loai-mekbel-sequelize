// __tests__/user.test.ts
import request from 'supertest';
import User from '../src/database/models/User';
import app from '../src/app';
describe('User API Tests', () => {
  

  it('should create a new user', async () => {
    const newUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword123',
    };
    const response = await request(app)
      .post('/api/users')
      .send(newUser);

    expect(response.status).toBe(201);

  });


  it('should get all users', async () => {
   
    const response = await request(app)
      .get('/api/users')
      

    expect(response.status).toBe(200);

  });
  

  it('should get  user by id', async () => {
   
    const response = await request(app)
      .get('/api/users/1')
      

    expect(response.status).toBe(200);

  });

  /*

  it('should update the user email',async()=>{
    const reqBody = {
      email:"test@gmail.com"
    }
    const response = await request(app).put('/api/users/1').send(reqBody);

    expect(response.status).toBe(203);

  })

  it('should delete the user ',async()=>{
    
    const response = await request(app).delete('/api/users/1');

    expect(response.status).toBe(202);

  })
  */
});



