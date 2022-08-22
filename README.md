
# StarBurger: a restaurant on a far side of the Gallaxy

This site is a Customer Relationship Managment (CRM) system to serve clients of a restaurant. The restaurant (a Customer for this software) cooks burgers. A client can specify what a burger consists of from a list of ingredients. Every burger is made of a bun and optional ingredients (sauces, toppings, fillings, etc). After the burger's content is specified, the user sends the content to a restaurant's cook. The user is notified after his/her burger is ready to be delivered. 

## Functional requirements:

    I. A non-registered client should be able to:
        1. See a full list of burger ingredients; every ingredient comes under its own category (buns, sauses, fillings, etc).
        2. See what every ingredient is composed of, its carbon/fat/calory content.
        3. Select an ingredient for a burger. For a burger to be cooked, there must be 1 and only 1 bun and an arbitrary number of other ingredients. Ones an ingredinet is selected, the user should see an indicator of how many pieces of the ingredient he or she picked.
        4. Remove a non-bun ingredient from the already selected ingredients; the indicator should be updated accordingly.
        5. See a list of burgers (with ingredients shown) ordered by other (anonimized) clients. Also, the client should be able to see statistics of how many burgers are currently being cooked and already cooked today.
        6. See a detailed info of every order from the previous requirement: the cost of every ingredient, order status, total cost, the date and time the order was made.   
        7. Register on the site.
    II. A registered client should be able to:
        1. Make an order: send the specified ingredient list to a restaurant's cook.
        2. See the order status: in progress, done, failed. In case of failure, the client should receive a reason why this happened (no internet connection, the kitchen run out of a specific ingredient, etc).
        3. Change his/her username, login, and password.
        4. See his/her order history.
        5. See a detailed info on the client's every previous order: the cost of every ingredient, order status, total cost, the date and time the order was made.
        6. Gracefully logout from the application.         
      

## Implementation details:

    1. The developer needs to program and deploy only the fron-end part (the Application) by means of React library and CRA tool. The back-end (the Server) is already fully programmed and deployed by the Customer.
    2. The Customer provides Figma pictures of the most of the site pages.
    3. The Customer provides a component library for ingredient images, icons, fonts.
    4. The application screen should be adaptive for various display sizes (medium to large).
    5. To select an ingredient, a client drags and drops the ingredient from one part of the screen to another. Also, the client can "shaffle" the images of the already chosen ingredients.
    6. Order and ingredient details should be presented in a modal window, where the other parts of the screen are shown in an opaque background.
    7. The Application gets a full ingredient list via an ajax call to the Server. To order a burger, the Application makes an ajax call to the Server.
    8. Order history is obtained and updated in real-time via web-socket connections with the Server.
    9. The client gets initially authorized by his/her login and password. If successfully authorized by the Server, the client receives JWT tokens. The tokens are stored in the browser local storage.
    10. The uploaded data and the application state must be cached in a Redux store.
    11. Authorized user-only pages must be secured by protected routes.  
    11. Critical parts of the system must be covered with unit tests.
    12. The scenarios of how the client drags-and-drops ingredients, orders his/her burger to be cooked, and gets ingredient details, must be covered with e2e Cypress tests.      
    13. Typescript checks should be used whenever possible.
    14. The Application should be deployed by the developer on Github Pages or an alternative platform.

## Technology used:

    - react
    - react-router
    - react-dnd
    - css module
    - react-redux
    - redux-thunk
    - typescript
    - webSocket
    - ajax
    - react-context
    - jwt
    - react-test-lib
    - jest
    - cypress
    - react-cra
    - figma
    - @ya.praktikum/react-developer-burger-ui-components

## How to run the code on a local machine:

    - upload the project from Github: https://github.com/sasha81/YandReact.git
    - install the project: `npm install`
    - run the project: `npm run start`
    - run unit tests: `npm run test` 
    - run Cypress e2e test: `npm run cypress:open` 

## Website demonstration

The site of this project is deployed at: https://sasha81.github.io/YandReact/    
