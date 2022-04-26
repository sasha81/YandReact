import { combineReducers } from 'redux';
import {orderDetailsReducer,ingredientDetailsReducer,allIngredientsReducer,bunReducer,mapReducer,ingredientReducer,visitsReducer,securityUserReducer} from './constructor';


const rootReducer = combineReducers({
    'orderDetails':orderDetailsReducer,
    'ingredientDetails':ingredientDetailsReducer,
    'allIngredients':allIngredientsReducer,
    'bun':bunReducer,
    'ingredientMap': mapReducer,
    'ingredients':ingredientReducer,
    'user':securityUserReducer,
    'visited':visitsReducer
  })
export default rootReducer;  