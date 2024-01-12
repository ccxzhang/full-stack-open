const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blogs');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

// Exercise 4.8
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('blogs to have the coorect amount of number', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

// Exercise 4.9: Verify the Existence of id
describe('The id property', () => {
  test('the existence of id property', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogs = response.body;
    expect(blogs.length).toBeGreaterThan(0); // Ensure there are blogs to test

    blogs.forEach(blog => {
      expect(blog.id).toBeDefined(); // Check that each blog has an id property
    });
  });
      
  test('blog post _ids are unique', () => {
    const ids = helper.initialBlogs.map(b => b._id);
    expect(new Set(ids).size).toEqual(helper.initialBlogs.length);
  });
});


// Exercise 4.10:
describe('Posting blogs', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'My Own Test',
      author: 'Charlie Zhang',
      url: 'http://charliezhang.net/blogs',
      likes: 23,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogAtEnd = await helper.blogsInDb();
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const urls = blogAtEnd.map(blog => blog.url);
    expect(urls).toContain(
      'http://charliezhang.net/blogs'
    );
  });

  // Exercise 4.11: Missing Like Properties
  test('a missing like property will be set as 0', async () => {
    const newBlog = {
      title: 'GeoSpatial Analysis',
      author: 'Charlie Zhang',
      url: 'http://charliezhang.net/GeoSpatialAnalysis',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogAtEnd = await helper.blogsInDb();
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const blogWithoutLikes = blogAtEnd.find(blog => blog.url == 'http://charliezhang.net/GeoSpatialAnalysis');
    expect(blogWithoutLikes.likes).toEqual(0);
  });});

// Exercise 4.12: Missing Title/URL => 400
describe('Adding a blog', () => {
  test('succeeds with a valid data', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToChange = blogsAtStart[0];
    const newBlog = {
      title: blogsAtStart[0].title,
      author: blogsAtStart[0].author,
      url: blogsAtStart[0].url,
      likes: 100
    };

    await api
      .put(`/api/blogs/${blogToChange.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogAfterPut = await helper.blogsInDb();
    const blogChanged = blogAfterPut.find(blog => blog.id == blogToChange.id);
    expect(blogChanged.likes).toEqual(newBlog.likes);

  });
  
  test('a missing title will lead to 400', async () => {
    const newBlog = {
      title: 'GeoSpatial Analysis',
      author: 'Charlie Zhang'
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });

});


describe('deletion of a blog', () => {
  test('succeeds with the status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogAfterDeletion = await helper.blogsInDb();
    expect(blogAfterDeletion).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogAfterDeletion.map(blog => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});