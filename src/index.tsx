import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import {initalOrderDetailsReducer,ingredientDetailsReducer,allIngredientsReducer,bunReducer,mapReducer,ingredientReducer} from './services/reducers/constructor';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const rootReducer = combineReducers({
  'initalOrderDetails':initalOrderDetailsReducer,
  'ingredientDetails':ingredientDetailsReducer,
  'allIngredients':allIngredientsReducer,
  'bun':bunReducer,
  'ingredientMap': mapReducer,
  'ingredients':ingredientReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store=createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
  ));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
