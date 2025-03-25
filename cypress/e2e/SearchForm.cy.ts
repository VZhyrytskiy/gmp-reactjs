describe('SearchForm Spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders search input', () => {
    cy.get("[id='searchQuery']")
      .should('exist')
      .should('have.attr', 'placeholder', 'What do you want to watch?');

  })

  it('renders search button', () => {
    cy.get("[test-id='search-btn']")
      .should('exist')
      .should('have.text', 'Search');
  })

  it('allows typing in the search input', () => {
    const inputText = 'Test Movie';
    cy.get("[id='searchQuery']")
      .type(inputText)
      .should('have.value', inputText);
  });

  it('renders the correct structure of the form', () => {
    cy.get('form').should('exist');
    cy.get('form').within(() => {
      cy.get("[id='searchQuery']").should('exist');
      cy.get("[test-id='search-btn']").should('exist');
    });
  });

 
})