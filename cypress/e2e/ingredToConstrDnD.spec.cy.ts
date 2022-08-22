import '@4tw/cypress-drag-drop'

const baseURL = 'http://localhost:3000';
const login = 'abcd@gmail.com';
const password = '123';


describe('service is available', function () {
  it('should be available on localhost:3000', function () {
    cy.visit(baseURL);
  });
});




describe('ingredients to constructor DnD works correctly', function () {
  it('ingredient list is non-empty', function () {
    cy.visit(baseURL);
    cy.get('[data-cy="ingredientContainer"] [data-cy="ingredient"]>[data-cy="ingredientName"]').first().then($name => {
      assert($name.text().length > 1);
    })
  })




  it('the first bun is dragged correctly', function () {
    cy.visit(baseURL);

    cy.get('[data-cy="ingredientContainer"] [data-cy="ingredient"]>[data-cy="ingredientName"]').first().then($name => {

      cy.get('[data-cy="ingredientContainer"] [data-cy="ingredient"]').first().drag('[data-cy="bunContainer"]');
      cy.get('[data-cy="bunContainer"]').contains($name.text());
    })

  });
})

describe('create order functionality works correctly', function () {

  it('the create order functionality works. No prior authorization', function () {
    cy.visit(baseURL);
    window.localStorage.clear();

    cy.get('[data-cy="ingredientContainer"] [data-cy="ingredient"]>[data-cy="ingredientName"]').first().then($name => {

      cy.get('[data-cy="ingredientContainer"] [data-cy="ingredient"]').first().drag('[data-cy="bunContainer"]');
      cy.get('[data-cy="bunContainer"]').contains($name.text());

      cy.get('[data-cy="createOrderButton"] button').click();
      cy.get('[data-cy="loginForm"] [data-cy="nameField"]').type(login)
      cy.get('[data-cy="loginForm"] [data-cy="passwordField"]').type(password)
      cy.get('[data-cy="loginForm"] [data-cy="loginButton"]').click();


      cy.get('[data-cy="orderDetailsContainer"]').contains("Цена");

    })


  });

  it('the create order functionality works, then order window is closed. No prior authorization', function () {
    cy.visit(baseURL);
    window.localStorage.clear();

    cy.get('[data-cy="ingredientContainer"] [data-cy="ingredient"]>[data-cy="ingredientName"]').first().then($name => {

      cy.get('[data-cy="ingredientContainer"] [data-cy="ingredient"]').first().drag('[data-cy="bunContainer"]');
      cy.get('[data-cy="bunContainer"]').contains($name.text());

      cy.get('[data-cy="createOrderButton"] button').click();
      cy.get('[data-cy="loginForm"] [data-cy="nameField"]').type(login)
      cy.get('[data-cy="loginForm"] [data-cy="passwordField"]').type(password)
      cy.get('[data-cy="loginForm"] [data-cy="loginButton"]').click();


      cy.get('[data-cy="orderDetailsContainer"]').contains("Цена").then((el) => {
        cy.wait(10000);
        cy.get('[data-cy="orderDetailsContainer"]').contains("Ваш # заказа");
        cy.get('[data-cy="modalCloseButton"]').click();
      });

      cy.wait(5000);

      cy.contains('[data-cy="orderDetailsContainer"]').should('not.exist').then(() => {
        cy.get('[data-cy="constructorTotalCost"]').then($val => {
          assert($val.text(), String(0));
        })
        cy.get('[data-cy="bunContainer"]').should('not.contain', $name.text());
      });


    })


  });


});

describe("modal window works correctly", () => {
  it("modal window gets opened", () => {
    cy.visit(baseURL);
    cy.get('[data-cy="ingredientContainer"] [data-cy="ingredient"]>[data-cy="ingredientInfo"]').first().then($element => {
      $element.click();

      cy.get('[data-cy="ingredientDetailsContainer"]').should('exist').then(($el) => {
        cy.get('[data-cy="ingredientContainer"] [data-cy="ingredient"]>[data-cy="ingredientName"]').first().then($name => {
          cy.get('[data-cy="ingredientDetailsContainer"]').should('contain', $name.text());
        })
      });



    })
  })

  it("modal window closes", () => {
    cy.visit(baseURL);
    cy.get('[data-cy="ingredientContainer"] [data-cy="ingredient"]>[data-cy="ingredientInfo"]').first().then($element => {
      $element.click();

      cy.get('[data-cy="ingredientDetailsContainer"]').should('exist').then($el => {
        cy.get('[data-cy="modalCloseButton"]').click();
      });
      cy.wait(5000);
      cy.get('[data-cy="ingredientDetailsContainer"]').should('not.exist')

    })
  })


})


