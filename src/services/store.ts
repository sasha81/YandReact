import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  const store=createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
    ));
    export type RootState = ReturnType<typeof rootReducer>

    export default store;
