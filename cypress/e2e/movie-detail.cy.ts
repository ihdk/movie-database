describe('Movie Detail', () => {

  it('Visit movie detail', () => {
    cy.visit('/movie/tt1258157')
  })

  it('Header home button', () => {
    cy.get('header').find('.home-menu-button').should('have.attr', 'href', `/`)
  })

  it('Movie image', () => {
    cy.get('.movie-image').should('exist')
  })

  it('Add to favourites', () => {
    cy.get('header').find('.favourites-menu-button').should('not.exist')
    cy.get('.favourite-button button').click({ force: true })
  })

  it('Visible favourites header menu button', () => {
    cy.get('.favourites-menu-button')
      .should('contain.text', 'My movies (1)')
      .should('have.attr', 'href', '/favourites')
  })

  it('Remove from favourites', () => {
    cy.get('.favourite-button button').click({ force: true })
    cy.get('.favourites-menu-button').should('not.exist')
  })

})

export { }