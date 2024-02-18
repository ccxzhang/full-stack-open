// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Previous version of bypassing UI
// Cypress.Commands.add('login', ({ username, password }) => {
//   cy.visit(`${Cypress.env('BACKEND')}`);
//   cy.contains('login').click();
//   cy.get('#username').type(username);
//   cy.get('#password').type(password);
//   cy.get('#login-button').click();
// });

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedInUser', JSON.stringify(body));
    cy.visit('http://localhost:3003');
  });
});


Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.contains('new blog').click({ force: true });
  cy.get('#title-input').type(title);
  cy.get('#author-input').type(author);
  cy.get('#url-input').type(url);
  cy.contains('create').click();
});