var _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};


const totalLikes = (blogs) => {

  return blogs.length == 0
    ? 0
    : blogs.reduce((total, current) => {
      return total + current?.likes;
    }, 0);
};


const favoriteBlog = (blogs) => {
  const likesArray = blogs.map(blog => blog?.likes);
  const maxIdx = likesArray.indexOf(Math.max(...likesArray));
  const maxLikeBlog = blogs[maxIdx];

  return {
    title: maxLikeBlog?.title,
    author: maxLikeBlog?.author,
    likes: maxLikeBlog?.likes
  };
};

const mostBlog = (blogs) => {
  const authors = {};
  for (let blog of blogs) {
    if (!(blog.author in authors)) {
      authors[blog.author] = 1;
    } else {
      authors[blog.author] += 1;
    }
  }
  const elements = Object.keys(authors).map((key) => {
    return [key, authors[key]];
  });
  elements.sort((first, second) => { return second[1] - first[1]; });
  elements.map((e) => { return e[0]; });
  return {
    'author': elements[0][0],
    'blogs': Number(elements[0][1])
  };
};


const mostLikes = (blogs) => {
  const likes = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  const mostLikedAuthor = Object.entries(likes).sort((a, b) => b[1] - a[1])[0];

  return {
    author: mostLikedAuthor[0],
    likes: mostLikedAuthor[1]
  };
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes
};