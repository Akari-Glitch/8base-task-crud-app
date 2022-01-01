describe('Sign in', () => {
  it('llenar el formulario y enviar', () => {
    cy.visit('http://localhost:3000');

    cy.get('.sign-in-button').contains('Sign In').click();

    cy.get('#signInFormUsername').type('prueba@gmail.com', { force: true }).should('have.value', 'prueba@gmail.com');
    cy.get('#signInFormPassword').type('Holamundo1', { force: true }).should('have.value', 'Holamundo1');
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > .cognito-asf > .btn').click();
  });
});
