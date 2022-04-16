import { combineReducers } from 'redux';
import {orderDetailsReducer,ingredientDetailsReducer,allIngredientsReducer,bunReducer,mapReducer,ingredientReducer} from './constructor';


const rootReducer = combineReducers({
    'orderDetails':orderDetailsReducer,
    'ingredientDetails':ingredientDetailsReducer,
    'allIngredients':allIngredientsReducer,
    'bun':bunReducer,
    'ingredientMap': mapReducer,
    'ingredients':ingredientReducer
  })
export default rootReducer;  