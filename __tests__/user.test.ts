
import sequelize from '../src/database/connections';
import request from 'supertest';
import User from '../src/database/models/User';
import app from '../src/app';
import { NextFunction } from 'express';
import { createToken } from '../src/utils/createToken';
import { server } from '../src/index';

jest.mock("../src/database/models/User", ()=>({
  HasMany : jest.fn(),
  findByPk :jest.fn(),
  create : jest.fn(),
  findAll: jest.fn(),
  save: jest.fn()
}))

jest.mock("../src/utils/verfiyToken",()=>({
  verifyToken : async (req:any ,res:any , next:any )=> {
    req.token = {id:1 , username:"mockedUser"}
    next();
  }
}))

jest.mock('../src/utils/createToken',()=>({
  createToken : jest.fn(()=>'mocked token')
}))


jest.mock('../src/utils/userVerification',()=>({
  verifyUser: async (req:any ,res:any , next:any )=> {
    next();
  }
}))

describe('User API Tests', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should create a new user', async () => {
    const newUser = {
      username: 'mockedUser',
      email: 'test@example.com',
      password: 'testpassword123',
    };

    (User.create as jest.Mock).mockResolvedValue({
      id: 1,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
    });
    

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


 
});



