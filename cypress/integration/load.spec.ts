describe('Main Page', () => {
    it('successfully loads', () => {
      cy.visit('/')
        cy.contains('별').click()
      cy.url().should('include', '3000')
    })
  })