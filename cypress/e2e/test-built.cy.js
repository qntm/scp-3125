/* global describe, it, cy */

describe('SCP-3125', () => {
  it('loads and decrypts', () => {
    cy.visit('http://localhost:3000/dist/html/en.html')
    cy.contains('Object Class: Keter')

    cy.get('.regular-button').contains('5').click()
    cy.get('.regular-button').contains('5').click()
    cy.get('.regular-button').contains('5').click()
    cy.get('.regular-button').contains('5').click()
    cy.get('.regular-button').contains('5').click()
    cy.get('.regular-button').contains('GO').click()

    cy.contains('presumed neutralized by SCP-3125\'s concealment response')

    cy.get('*').contains('Addendum').click()
    cy.contains('S041-B30-000')

    cy.get('*').contains('Addendum 2').click()
    cy.contains('the loss condition')

    cy.get('*').contains('Addendum 3').click()
    cy.contains('interloper')
  })
})
