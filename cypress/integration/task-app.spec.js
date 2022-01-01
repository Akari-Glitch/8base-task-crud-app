describe('task app', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('el input recibe el  title y el texto', () => {
		cy.get('input:first', { timeout: 10000 }).type('hola');
		cy.get('.submit-button').click();
		cy.get('input:first').type('lol');
		cy.get('.submit-button').click();
	});

	it('el edit abre', () => {
		cy.get('.button-edit:first', { timeout: 10000 }).click({ force: true });
	});
});
