import {
    PICK_INGREDIENT,
    SET_INGREDIENTS,
    DELETE_INGREDIENT,
    SET_INFO_INGREDIENT,
    MAKE_ORDER,
    DECREMENT_MAP,
    INCREMENT_MAP,
    SET_BUN,
    INCREASE_BUN_MAP,
    DECREASE_BUN_MAP,
    UPDATE_BUN_MAP,
    SWITCH_INGREDIENT

} from '../actions/constructor';
import { IBareBurgerIngredient, IReduxState,IOrder } from '../../components/Interfaces';

export const initialState: IReduxState= {
    bun:null, ingredients:[], ingredientMap:{}, allIngredients:[], ingredientDetails:null,orderDetails:null
}

const initialIngredients: IBareBurgerIngredient[] =[];
const initialBun: IBareBurgerIngredient | null = null;
const initialIngredientMap: Object={};
const initialAllIngredients: IBareBurgerIngredient[] | string =[];
const initalIngredientDetails:  IBareBurgerIngredient | null = null;
const initalOrderDetails:  IOrder | null = null;

export const initalOrderDetailsReducer = (state = initalOrderDetails, action:{type:string, payload: IOrder | null })=>{
    switch(action.type){
        case MAKE_ORDER:
            return action.payload ? {...action.payload}: null;

        default:
            return state;
    }
    
}


export const ingredientDetailsReducer = (state = initalIngredientDetails, action:{type:string, payload:IBareBurgerIngredient | null })=>{
    switch(action.type){
        case SET_INFO_INGREDIENT:{
         if(action.payload) return {...action.payload};
         else return null;
        }
        default:
            return state;
    }
}

export const allIngredientsReducer =  (state=initialAllIngredients, action:{type:string, payload:IBareBurgerIngredient[]| string })=>{
    switch(action.type){
        case SET_INGREDIENTS:
            return  Array.isArray(action.payload)? [...action.payload]:action.payload;
        default:
            return state;
    }
}

export const bunReducer = (state=initialBun, action:{type:string, payload:IBareBurgerIngredient })=>{
    switch(action.type){       

        case SET_BUN :
            return {...action.payload};     
        
        
        default:
            return state;
    }
}

export const mapReducer =  (state=initialIngredientMap, action:{type:string, payload:IBareBurgerIngredient  })=>{
    switch(action.type){
       

        case DECREMENT_MAP: {
            const _id = action.payload._id;

            const tempContext = JSON.parse(JSON.stringify(state));
            if(state&& state.hasOwnProperty(_id) && state[_id]>1){
                tempContext[_id]=state[_id]-1
            }
            else if(state && state.hasOwnProperty(_id) && state[_id]===1){
                const obj = tempContext.ingredientMap;
                delete obj[_id];
            
            }
            else{
            
            }
            return tempContext
        }
        case INCREMENT_MAP:{
            const _id = action.payload._id;
            const tempContext = JSON.parse(JSON.stringify(state));

            if(state&& state.hasOwnProperty(_id)){
              tempContext[_id]=state[_id]+1;
            
            }
            else{
              tempContext[_id]=1;
              
            }
            return tempContext
        }
        
        case DECREASE_BUN_MAP:{
            const tempContext = {...state};
            const _id = action.payload._id
            if(state.hasOwnProperty(_id)) {
                
                tempContext[_id]=0;
              }
    
              
              return tempContext;
        }
        case INCREASE_BUN_MAP:{
            const tempContext = {...state};
            const _id = action.payload._id;      
                
                tempContext[_id]=1;     
              
              return tempContext;
        }        
        default:
            return state;



    }
}


export const ingredientReducer = (state=initialIngredients, action:{type:string, payload:IBareBurgerIngredient })=>{
    switch(action.type){
        case PICK_INGREDIENT :
            return {...state,ingredients:state.concat(action.payload)}

        
        case DELETE_INGREDIENT :
            return {...state, ingredients: state.filter(ingredient=>{return ingredient._id!==action.payload._id})}; 

        
        
        default:
            return state;



    }
}


export const constructorIngredientReducer = (state=initialState, action :{type:string, payload:IBareBurgerIngredient })=>{
    switch(action.type){
        case PICK_INGREDIENT :
            return {...state,ingredients:state.ingredients.concat(action.payload)}

        case DECREMENT_MAP: {
            const _id = action.payload._id;

            const tempContext = JSON.parse(JSON.stringify(state));
            if(state&& state.ingredientMap.hasOwnProperty(_id) && state.ingredientMap[_id]>1){
                tempContext.ingredientMap[_id]=state.ingredientMap[_id]-1
            }
            else if(state && state.ingredientMap.hasOwnProperty(_id) && state.ingredientMap[_id]===1){
                const obj = tempContext.ingredientMap;
                delete obj[_id];
            
            }
            else{
            
            }
            return tempContext
        }
        case INCREMENT_MAP:{
            const _id = action.payload._id;
            const tempContext = JSON.parse(JSON.stringify(state));

            if(state&& state.ingredientMap.hasOwnProperty(_id)){
              tempContext.ingredientMap[_id]=state.ingredientMap[_id]+1;
            
            }
            else{
              tempContext.ingredientMap[_id]=1;
              
            }
            return tempContext
        }
        case DELETE_INGREDIENT :
            return {...state, ingredients: state.ingredients.filter(ingredient=>{return ingredient._id!==action.payload._id})};
       

        case SET_BUN :
            return {...state, bun:action.payload};
        
        case SET_INFO_INGREDIENT:
            return {...state, ingredientDetails:action.payload}; 
        case MAKE_ORDER:{
            return {...state, orderDetails:action.payload};
        }
        case UPDATE_BUN_MAP:{
            const tempContext = JSON.parse(JSON.stringify(state));
            const _id = action.payload._id
            if(tempContext.bun) {
                const prevBunId = tempContext.bun._id;
                tempContext.ingredientMap[prevBunId]=0;
              }
    
              tempContext.bun={...action.payload};
              tempContext.ingredientMap[_id]=1;
              return tempContext;
        }
        
        default:
            return state;



    }
}
export const updateIngredientReducer = (state=initialState, action:{type:string,to:number, from:number})=>{
    switch(action.type){
        case SWITCH_INGREDIENT:{
            const tempContext = JSON.parse(JSON.stringify(state));
      
      tempContext.ingredients[action.to] = state.ingredients[action.from];
      tempContext.ingredients[action.from] = state.ingredients[action.to];
      return tempContext;
        }
    }
}

export const constructorIngredientArrayReducer = (state=initialState, action :{type:string, payload: IBareBurgerIngredient[] | string})=>{
    switch(action.type){
        case SET_INGREDIENTS:
            return {...state, allIngredients: Array.isArray(action.payload)? [...action.payload]:action.payload};
        default:
            return state;
    }
}