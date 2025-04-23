describe('Movie App End-to-End Tests', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/movies**', { fixture: 'movies.json' }).as('fetchMovies'); 
        cy.visit('/'); 
        cy.wait('@fetchMovies'); 
    });
  
    it('renders the movie list page with SearchForm', () => {
      cy.contains('find your movie').should('be.visible');
      cy.get('input#searchQuery').should('be.visible').and('have.attr', 'placeholder', 'What do you want to watch?');
      cy.get('button[test-id="search-btn"]').should('be.visible');
    });
  
    it('submits a search and updates the query parameters', () => {
      cy.get('input#searchQuery').type('Inception');
      cy.get('button[test-id="search-btn"]').click();
  
      cy.url().should('include', '?query=Inception');
    });
  
    xit('renders details page when clicking on a movie', () => {
      cy.contains('Fifty Shades Freed').should('be.visible').click();
  
      cy.url().should('include', '/337167');
  
      cy.contains('Movie Details').should('be.visible');
      cy.contains('Fifty Shades Freed').should('be.visible'); 
    });
  
    xit('handles navigation between pages correctly', () => {
      cy.contains('Fifty Shades Freed').should('be.visible').click();
      cy.url().should('include', '/337167');
  
      cy.go('back');
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });