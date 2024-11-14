
import sequelize from '../src/database/connections';
import request from 'supertest';
import User from '../src/database/models/User';
import app from '../src/app';


jest.mock("../src/database/models/User",()=>({
  HasMany : jest.fn(),
  findByPk :jest.fn(),
  create : jest.fn(),
  findAll: jest.fn(),
  save: jest.fn()
}))


describe('User API Tests', () => {
  

  it('should create a new user', async () => {
    const newUser = {
      username: 'testuserrrrrrrrrrrrrrrrr',
      email: 'test@example.com',
      password: 'testpassword123',
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser);

    expect(response.status).toBe(201);

  });


  it('should get all users', async () => {

    const mockUsers: any[] = [
      {
        id: 1,
        username: "testuserrrrrrrrrrrrrrrrr",
        email: "test@example.com",
        password: "testpassword123",
      },
      {
        id: 2,
        username: "test",
        email: "test@examplee.com",
        password: "testpassword0000",
      },
    ];
    
  (User.findAll as jest.Mock).mockResolvedValue(mockUsers)

    const response = await request(app)
      .get('/api/users')
      

    expect(response.status).toBe(200);

  });
  

  it('should get  user by id', async () => {
    const mockUser = {
      id:1,
      username: 'testuserrrrrrrrrrrrrrrrr',
      email: 'test@example.com',
      password: 'testpassword123',
    };

    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);


    const response = await request(app)
      .get('/api/users/1')
      

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(mockUser);
  });

  

  it('should update the user email',async()=>{
    const mockUser = {
      id:1,
      username: 'testuserrrrrrrrrrrrrrrrr',
      email: 'test@example.com',
      password: 'testpassword123',
      save : async function() {
          return 'tamam'
      }
    };
    
    const updateUser = {
      email: "newEmail@gmail.com",
    };

    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).put('/api/users/1').send(updateUser);

    expect(response.status).toBe(203);

  })

  /*

  it('should delete the user ',async()=>{
    
    const response = await request(app).delete('/api/users/1');

    expect(response.status).toBe(202);

  })
  */
});



