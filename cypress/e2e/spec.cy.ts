const appNameText = Cypress.env('appNameText');

describe('Movie Search', () => {

  it('Visit site', () => {
    cy.visit('/')
  })

  it('Check elements', () => {
    cy.get('header h1').should('contain.text', appNameText)

    cy.get('.search-bar').should('exist').should('be.visible')

    cy.get('.search-bar').within(() => {
      cy.get('.search-input').should('exist').should('be.visible').should('be.empty')
      cy.get('.search-button').should('exist').should('be.visible').should('have.text', 'Find movie')
      cy.get('.cancel-button').should('exist').should('be.visible').should('have.text', 'Cancel')

      cy.get('.search-button').click()
      cy.get('.search-input').should('have.focus')
    })

    cy.get('.search-results').should('not.exist')

  })

  it('Process search', () => {
    cy.get('.search-button').as('searchButton')
    cy.get('.cancel-button').as('cancelButton')

    cy.get('.search-bar').within(() => {

      cy.get('.search-input')
        .type('Terminator')
        .should('have.value', 'Terminator')

      cy.get('@searchButton').click().wait(1000)

    })

    cy.get('.search-results').should('exist')

    cy.get('.search-results').within(() => {
      //define expected results
      const total = 95;
      const step = 10;

      cy.get('.load-more-button').should('exist').as('loadMoreButton')

      // check number of results
      cy.get('h2').should('contain.text', `Found ${total} movies`)
      cy.get('.search-results-header').should('contain.text', `Showing ${step} of ${total}`)
      cy.get('.MuiGrid-root.MuiGrid-container').should('exist').as('gridContainer')

      cy.get('@gridContainer').find('.MuiGrid-item').should('have.length', step)

      // test load more movies
      for (let clicks = 1; clicks <= 2; clicks++) {
        cy.get('h2').should('contain.text', `Found ${total} movies`)
        cy.get('.search-results-header').should('contain.text', `Showing ${step * clicks} of ${total}`)
        cy.get('@gridContainer').find('.MuiGrid-item').should('have.length', step * clicks)



        cy.get('@loadMoreButton').click().wait(1000)
        cy.get('@loadMoreButton').should('contain.text', `Load next ${step} movies`)

      }
    })
  })


  it('Movies links', () => {
    cy.get('.MuiGrid-root.MuiGrid-container').find('.movie-item').each(($movieItem) => {
      cy.wrap($movieItem).find('a').should('have.attr', 'href', `/movie/${$movieItem.data('movie-id')}`)
    })
  })


  it('Add to favourites', () => {
    cy.get('.MuiGrid-root.MuiGrid-container').find('.MuiGrid-item').first().find('.movie-item').as('firstItem');

    cy.get('@firstItem').should('not.have.class', 'is-favourite')
    cy.get('@firstItem').find('.favourite-button-wrapper').should('exist').find('button').as('favouriteButton')
    cy.get('.favourites-menu-button').should('not.exist')
    cy.get('@favouriteButton').click({ force: true })
    
    cy.get('@firstItem').should('have.class', 'is-favourite')

  })

  it('Favourites header menu button', () => {
    cy.get('.favourites-menu-button')
      .should('exist')
      .should('contain.text', 'My movies (1)')
      .should('have.attr', 'href', '/favourites')
  })


  it('Remove from favourites', () => {
    // try ty add into favourites
    cy.get('.MuiGrid-root.MuiGrid-container').find('.MuiGrid-item').first().find('.movie-item').as('firstItem');

    cy.get('@firstItem').find('.favourite-button-wrapper').find('button').as('favouriteButton')
    cy.get('@favouriteButton').click({ force: true })

    // is not favourite
    cy.get('.favourites-menu-button').should('not.exist')
    cy.get('@firstItem').should('not.have.class', 'is-favourite')

  })


  it('Process search cancel', () => {
    cy.get('.search-bar').within(() => {

      cy.get('.search-input')
        .should('have.value', 'Terminator')

      cy.get('.cancel-button').click()

      cy.get('.search-input').should('have.value', '')

    })
    cy.get('.search-results').should('not.exist')
  })

  it('Non-existing movie search', () => {
    cy.get('.search-button').as('searchButton')

    cy.get('.search-bar').within(() => {
      cy.get('.search-input').type('This should not exists')
      cy.get('@searchButton').click().wait(1000)
    })

    cy.get('.search-results').should('not.exist')

    cy.get('.Toastify').should('contain.text', 'Movie not found!')

  })
})



export {}