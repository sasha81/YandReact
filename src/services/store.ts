import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer'
import thunk,{ ThunkAction} from 'redux-thunk';
import {Actions} from 'services/actions/Interfaces';
import {WSActions} from 'services/actions/wsActions'
import { Action, ActionCreator } from 'redux';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {socketMiddleware} from 'utils/wsMiddleware';
import {socketAuthMiddleware} from 'utils/wsAuthMIddleware';


const middleware = [thunk,socketMiddleware('wss://norma.nomoreparties.space/orders/all'),socketAuthMiddleware('wss://norma.nomoreparties.space/orders')];

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  const store=createStore(rootReducer, composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
    ));
  
    export type RootState = ReturnType<typeof store.getState>;
 
    export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, Actions | WSActions>
>

    //export type AppDispatch = ThunkDispatch<RootState, any, Actions>;
    export type AppDispatch = typeof store.dispatch;

    export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

// Хук не даст отправить экшен, который ему не знаком
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 

    export default store;
