// jest.setup.ts
import 'jest';
import sequelize from './src/database/connections'; // Path to your Sequelize instance

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Sync tables before tests
});

afterAll(async () => {
  await sequelize.close(); // Close connection after tests
});
