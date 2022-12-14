const appNameText = Cypress.env('appNameText');

describe('Movie Search', () => {

  it('Visit site', () => {
    cy.visit('/')
  })

  it('Check elements', () => {
    cy.get('header').find('.logo').as('logo')
    cy.get('@logo')
      .should('contain.text', appNameText)
      .find('a').should('have.attr', 'href', '/')

    cy.get('.search-bar').within(() => {
      cy.get('.search-input').should('be.empty')
      cy.get('.search-button').should('have.text', 'Find movie')
      cy.get('.cancel-button').should('have.text', 'Cancel')

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
        .type('scooby')
        .should('have.value', 'scooby')

      cy.get('@searchButton').click().wait(1000)

    })

    cy.get('.search-results').should('exist')

    cy.get('.search-results').within(() => {
      //define expected results
      const total = 97;
      const step = 10;

      // check number of results
      cy.get('h2').should('contain.text', `Found ${total} movies`)
      cy.get('.search-results-header').should('contain.text', `Showing ${step} of ${total}`)

      cy.get('.load-more-button').as('loadMoreButton')
      cy.get('.MuiGrid-root.MuiGrid-container').as('gridContainer')
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


  it('Movies data', () => {
    cy.get('.MuiGrid-root.MuiGrid-container').find('.movie-item').each(($movieItem) => {
      cy.wrap($movieItem).as('movieItem')
      cy.get('@movieItem').within(() => {
        cy.get('a').should('have.attr', 'href', `/movie/${$movieItem.data('movie-id')}`)
        cy.get('.favourite-button').should('exist')
      })
    })
  })


  it('Add to favourites', () => {
    cy.get('.MuiGrid-root.MuiGrid-container').find('.movie-item').first().as('firstItem');
    cy.get('@firstItem').find('.favourite-button button').as('favouriteButton')

    cy.get('@firstItem').should('not.have.class', 'is-favourite')
    cy.get('header').find('.favourites-menu-button').should('not.exist')

    cy.get('@favouriteButton').click({ force: true })

    cy.get('@firstItem').should('have.class', 'is-favourite')
  })

  it('Visible favourites header menu button', () => {
    cy.get('.favourites-menu-button')
      .should('contain.text', 'My movies (1)')
      .should('have.attr', 'href', '/favourites')
  })


  it('Remove from favourites', () => {
    cy.get('.MuiGrid-root.MuiGrid-container').find('.movie-item').first().as('firstItem');
    cy.get('@firstItem').find('.favourite-button button').as('favouriteButton')

    cy.get('@favouriteButton').click({ force: true })

    cy.get('.favourites-menu-button').should('not.exist')
    cy.get('@firstItem').should('not.have.class', 'is-favourite')

  })


  it('Process search cancel', () => {
    cy.get('.search-bar').within(() => {
      cy.get('.cancel-button').click()
      cy.get('.search-input').should('have.value', '')
    })
    cy.get('.search-results').should('not.exist')
  })

  it('Error: Movie not found', () => {
    cy.get('.search-button').as('searchButton')

    cy.get('.search-bar').within(() => {
      cy.get('.search-input').type('This should not exists')
      cy.get('@searchButton').click().wait(1000)
    })

    cy.get('.search-results').should('not.exist')

    cy.get('.Toastify').find('.Toastify__toast').should('have.class', 'Toastify__toast--error').should('contain.text', 'Movie not found!')
    cy.get('.search-bar .cancel-button').click()
  })

  it('Error: Too many results', () => {
    cy.get('.search-button').as('searchButton')
    cy.get('.search-bar').within(() => {
      cy.get('.search-input').type('1')
      cy.get('@searchButton').click().wait(1000)
    })

    cy.get('.search-results').should('not.exist')

    cy.get('.Toastify').find('.Toastify__toast').should('have.class', 'Toastify__toast--error').should('contain.text', 'Too many results')
  })

})

export { }