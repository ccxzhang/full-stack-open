describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user1 = {
      name: 'Charlie Zhang',
      username: 'czhang',
      password: 'czhang'
    };

    const user2 = {
      name: 'Fake User',
      username: 'fake',
      password: 'fake'
    };

    cy.request('POST', 'http://localhost:3003/api/users/', user1);
    cy.request('POST', 'http://localhost:3003/api/users/', user2);
    cy.visit('http://localhost:3003');
  });


  it('Login form is shown', function () {
    cy.contains('blogs');
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('czhang');
      cy.get('#password').type('czhang');
      cy.get('#login-button').click();

      cy.contains('Charlie Zhang logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();
      cy.get('.error').contains('Wrong username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'czhang', password: 'czhang' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title-input').type('Test Title');
      cy.get('#author-input').type('Test Author');
      cy.get('#url-input').type('https://example.com');
      cy.contains('create').click();
      cy.contains('a new blog Test Title by Test Author');
    });


    // 5.20
    it('User can like the blog', function () {
      cy.createBlog({ title: 'Test Title', author: 'Test Author', url: 'https://example.com' });
      cy.contains('view').click();
      const defaultLikes = 0;
      cy.contains(`Likes: ${defaultLikes}`);
      cy.contains('like').click();
      cy.contains(`Likes: ${defaultLikes + 1}`);
    });

    // 5.21
    it('User can delete a blog', function () {
      cy.createBlog({ title: 'Test Title', author: 'Test Author', url: 'https://example.com' });
      cy.contains('view').click();
      cy.contains('remove').click();
    });


    // 5.22
    it('Only the creator can see the delete button of a blog', function () {
      cy.createBlog({ title: 'Test Title', author: 'Test Author', url: 'https://example.com' });
      cy.get('#logout-button').click();
      cy.login({ username: 'fake', password: 'fake' });
      cy.contains('view').click();
      cy.contains('remove').should('not.exist');
    });

    // 5.23
    it('Test the blogs following the order by likes', function() {
      cy.createBlog({ title: 'Alternative Title', author: 'Alt Author', url: 'https://google.com' }).then(() => {
        cy.createBlog({ title: 'Most Likes', author: 'Test Author', url: 'https://example.com' });
      });
      cy.get('.blog').eq(1).contains('view').click();
      cy.contains('like').click();

      cy.get('.blog').eq(0).should('contain', 'Most Likes');
      cy.get('.blog').eq(1).should('contain', 'Alternative Title');

    });

  });
});