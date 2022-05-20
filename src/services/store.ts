import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer'
import thunk,{ThunkDispatch, ThunkAction} from 'redux-thunk';
import {IAction,Actions} from 'services/actions/Interfaces';
import { Action, AnyAction, Middleware } from 'redux';
import {IUserResponseBody, IForm,IUser} from 'components/Interfaces';

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
    export type RootState = ReturnType<typeof rootReducer>;
    type AppAction = ReturnType<typeof store.dispatch>;

    export type AppDispatch = ThunkDispatch<RootState, any, Actions>;

    export default store;
