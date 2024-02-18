import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('adding new blog', async() => {
  const newBlog = {
    title: 'GeoSpatial Analysis',
    author: 'Charlie Zhang',
    url: 'https://charliezhang.net/GeoSpatialAnalysis',
  };

  const mockHandler = jest.fn();
  const user = userEvent.setup();

  const { container } = render( <BlogForm createBlog={mockHandler} />);

  const titleInput = container.querySelector('#title-input');
  const authorInput = container.querySelector('#author-input');
  const urlInput = container.querySelector('#url-input');

  const createButton = screen.getByRole('button', { name: /create/i });
  await user.type(titleInput, `${newBlog.title}`);
  await user.type(authorInput, `${newBlog.author}`);
  await user.type(urlInput, `${newBlog.url}`);
  await user.click(createButton);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].title).toBe(`${newBlog.title}`);
  expect(mockHandler.mock.calls[0][0].author).toBe(`${newBlog.author}`);
  expect(mockHandler.mock.calls[0][0].url).toBe(`${newBlog.url}`);

});