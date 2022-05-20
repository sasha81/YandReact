import { combineReducers } from 'redux';
import {orderDetailsReducer,ingredientDetailsReducer,allIngredientsReducer,bunReducer,mapReducer,ingredientReducer,visitsReducer,securityUserReducer,noConnectionReducer} from './constructor';
import {IState} from 'services/reducers/constructor'

const rootReducer = combineReducers<IState>({
    'orderDetails':orderDetailsReducer,
    'ingredientDetails':ingredientDetailsReducer,
    'allIngredients':allIngredientsReducer,
    'bun':bunReducer,
    'ingredientMap': mapReducer,
    'ingredients':ingredientReducer,
    'user':securityUserReducer,
    'visited':visitsReducer,
    'noConnection':noConnectionReducer
  })
export default rootReducer;  