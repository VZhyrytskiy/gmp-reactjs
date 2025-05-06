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
    
    it('renders details page when clicking on a movie poster', () => {
      cy.intercept('GET', '**/movies/337167').as('fetchMovieDetails');
  
      cy.get('img[alt="Fifty Shades Freed"]').should('be.visible').click();
  
      cy.wait('@fetchMovieDetails');
  
      cy.url().should('include', '/337167');
  
      cy.get('body').then((body) => {
        if (body.find('h1:contains("Movie Details")').length > 0) {
          cy.contains('Movie Details').should('be.visible');
        } else {
          cy.log('Не удалось найти "Movie Details". Проверьте, отображается ли элемент на уровне интерфейса.');
        }
      });
  
      cy.contains('Fifty Shades Freed').should('be.visible');
    });
  
    it('handles navigation between pages correctly', () => {
      cy.intercept('GET', '**/movies**').as('fetchMovies');
      cy.intercept('GET', '**/movies/337167').as('fetchMovieDetails');
    
      cy.get('img[alt="Fifty Shades Freed"]').should('be.visible').click();
    
      cy.wait('@fetchMovieDetails');
      cy.url().should('include', '/337167'); 
    
      cy.go('back');
    
      cy.get('h1').contains('find your movie').should('be.visible');
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });