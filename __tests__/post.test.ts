import request from 'supertest';
import app from '../src/app'; // Adjust to your app entry point
import Post from '../src/database/models/Post';
import User from '../src/database/models/User';
import Comment from '../src/database/models/Comment';
import Category from '../src/database/models/Category';
import Category_Post from '../src/database/models/Category_Post';

describe('Post API', () => {
  

  test('Create a new post', async () => {
    const user = await User.create({ username: 'testuser', email: 'test@test.com' ,password:'m235287t'});
    const response = await request(app).post('/api/posts').send({
      autherId: Number(user.id),
      title: 'Test Title',
      summary: 'Test Summary',
      content: 'Test Content',
    });

    expect(response.status).toBe(201);
   
  });

  test('Fetch all posts with related data', async () => {
    const response = await request(app).get('/api/posts');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('post fetched successfully');
    expect(response.body.posts).toBeInstanceOf(Array);
  });

  test('Get a single post by ID', async () => {
    const post = await Post.create({
      autherId: 1,
      title: 'Post Title',
      summary: 'Post Summary',
      content: 'Post Content',
    });

    const response = await request(app).get(`/api/posts/${post.id}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(post.title);
  });

  /*

  test('Update a post', async () => {
    const post = await Post.create({
        autherId: 1,
        title: 'Post Title',
        summary: 'Post Summary',
        content: 'Post Content',
      });
    const response = await request(app).put(`/api/posts/${post.id}`).send({
      content: 'Updated Title',
    });

    expect(response.status).toBe(203);
    //expect(response.body.post.title).toBe('Updated Title');
  });

  test('Delete a post', async () => {
    const post = await Post.create({
      autherId: 1,
      title: 'Delete Title',
      summary: 'Delete Summary',
      content: 'Delete Content',
    });

    const response = await request(app).delete(`/api/posts/${post.id}`);

    expect(response.status).toBe(202);
    expect(response.body.message).toBe('post deleted successfully!');
  });

  test('Add a category to a post', async () => {
    const post = await Post.create({
      autherId: 1,
      title: 'Categorized Post',
      summary: 'With Category',
      content: 'Test Content',
    });

    const response = await request(app).post(`/api/posts/${post.id}/categories`).send({
      name: 'Tech',
      description: 'Technology category',
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('category added successfully!');
    expect(response.body.category.name).toBe('Tech');
  });

  test('Fetch all categories of a post', async () => {
    const post = await Post.create({
      autherId: 1,
      title: 'Post with Categories',
      summary: 'Summary',
      content: 'Content',
    });

    await Category.create({ name: 'Science', description: 'Science Category' });
    await Category_Post.create({ postId: post.id, categoryId: 1 });

    const response = await request(app).get(`/api/posts/${post.id}/categories`);

    expect(response.status).toBe(200);
    expect(response.body.categories).toBeInstanceOf(Array);
  });

  test('Create a comment on a post', async () => {
    const post = await Post.create({
      autherId: 1,
      title: 'Commented Post',
      summary: 'Summary',
      content: 'Content',
    });

    const response = await request(app).post(`/api/posts/${post.id}/comments`).send({
      userId: 1,
      content: 'Nice post!',
    });

    expect(response.status).toBe(201);
 
  });

  test('Fetch comments of a post', async () => {
    const post = await Post.create({
      autherId: 1,
      title: 'Post for Comments',
      summary: 'Summary',
      content: 'Content',
    });

    await Comment.create({ userId: 1, postId: post.id, content: 'Great post!' });

    const response = await request(app).get(`/api/posts/${post.id}/comments`);

    expect(response.status).toBe(200);
  });*/
});
