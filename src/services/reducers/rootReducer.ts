import { combineReducers } from 'redux';
import {orderDetailsReducer,ingredientDetailsReducer,allIngredientsReducer,bunReducer,mapReducer,ingredientReducer,securityUserReducer,noConnectionReducer} from './constructor';
import {IState} from 'components/Interfaces'
import {wsReducer} from 'services/reducers/wsReducer'


const rootReducer = combineReducers({
    'orderDetails':orderDetailsReducer,
    'ingredientDetails':ingredientDetailsReducer,
    'allIngredients':allIngredientsReducer,
    'bun':bunReducer,
    'ingredientMap': mapReducer,
    'ingredients':ingredientReducer,
    'user':securityUserReducer,
  
    'noConnection':noConnectionReducer,
    'wsConnection':wsReducer
  })
export default rootReducer;  