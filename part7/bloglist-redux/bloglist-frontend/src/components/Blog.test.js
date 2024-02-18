import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

// 5.13
test('Check Title and Author being rendered and details are not rendered by default', () => {
  const blog = {
    title: 'GeoSpatial Analysis',
    author: 'Charlie Zhang',
    url: 'https://charliezhang.net/GeoSpatialAnalysis',
    likes: 3,
  };

  render(<Blog blog={blog} />);

  const titleElement = screen.queryByText(`${blog.title} ${blog.author}`);
  const urlElement = screen.queryByText(`${blog.url}`);

  expect(titleElement).toBeInTheDocument();
  expect(urlElement).not.toBeInTheDocument();
});

// 5.14
test('clicking the button and details are shown', async () => {
  const blog = {
    title: 'GeoSpatial Analysis',
    author: 'Charlie Zhang',
    url: 'https://charliezhang.net/GeoSpatialAnalysis',
    likes: 3,
  };

  const mockHandler = jest.fn();
  render(
    <Blog blog={blog} updateLikes={mockHandler} removeBlog={mockHandler} />
  );

  const user = userEvent.setup();
  const button = screen.getByRole('button', { name: /view/i });
  await user.click(button);

  const urlElement = screen.queryByText(`URL: ${blog.url}`);
  const likeElement = screen.queryByText(`Likes: ${blog.likes}`);

  expect(urlElement).toBeInTheDocument();
  expect(likeElement).toBeInTheDocument();
});

// 5.15
test('clicking like button twice', async () => {
  const blog = {
    title: 'GeoSpatial Analysis',
    author: 'Charlie Zhang',
    url: 'https://charliezhang.net/GeoSpatialAnalysis',
    likes: 3,
  };

  const mockHandler = jest.fn();
  render(<Blog blog={blog} updateLikes={mockHandler} />);

  const user = userEvent.setup();
  const viewButton = screen.getByRole('button', { name: /view/i });
  await user.click(viewButton);

  const likeButton = screen.getByRole('button', { name: /like/i });
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
