const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');


blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs);
    });
});

blogsRouter.get('/:id', (request, response) => {
  const blog = Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

// Make Undefined likes to be 0
blogsRouter.post('/', (request, response, next) => {
  const body = request.body;

  if (body.title == undefined || body.url == undefined) {
    return response.status(400).end();
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body?.likes | 0,
    });
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result);
      })
      .catch(error => next(error));
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
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id);
  if (!deletedBlog) {
    // No blog found with the given ID
    return response.status(404).send({ error: 'Blog not found' });
  }
  response.status(204).end();
});

module.exports = blogsRouter;