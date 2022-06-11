import '@4tw/cypress-drag-drop'


describe('service is available', function() {
    it('should be available on localhost:3000', function() {
      cy.visit('http://localhost:3000');
    });
  }); 

  describe('ingredients to constructor DnD works correctly', function() {
    it('should be available on localhost:3000', function() {
      cy.visit('http://localhost:3000');
      cy.get('[data-cy="ingredient"]:first-of-type').drag('[data-cy="bunContainer"]');
    });
  }); 