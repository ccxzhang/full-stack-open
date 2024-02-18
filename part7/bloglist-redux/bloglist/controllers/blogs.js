const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

// Make Undefined likes to be 0
blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (body.title == undefined || body.url == undefined) {
    return response.status(400).end();
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body?.likes | 0,
      user: user.id
    });

    const savedblog = await blog.save();
    user.blogs = user.blogs.concat(savedblog._id);
    await user.save();
    response.status(201).json(savedblog);
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(savedBlog);

});


blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user; 
  if (!user){
    return response.status(401).json({ error: 'Unauthorized to delete the blog' }); 
  }
  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() == user.id) {
    await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).send({ error: 'Blog not found' });
  } else {
    return response.status(401).json({ error: 'Unauthorized to delete the blog' });
  }
});

module.exports = blogsRouter;