/// <reference types="cypress" />

describe('weather', () => {
  it('show the correct weather for Bernal', () => {
    cy.visit('http://localhost:5173/');
    cy.intercept('**/forecast**', {
      fixture: 'weather.json',
    });

    cy.get('select').should('have.value', 'Bernal');
    cy.get('h1').should('have.text', 'Bernal');
    cy.get('ul > li:first-of-type').should(
      'have.text',
      '12/22/2022: Min: 28 °C, Max: 28 °C'
    );
  });
});
