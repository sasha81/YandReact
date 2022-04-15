import {
    PICK_INGREDIENT,
    RESET_INGREDIENT,
    SET_INGREDIENTS,
    DELETE_INGREDIENT,
    SET_INFO_INGREDIENT,
    MAKE_ORDER,
    DECREMENT_MAP,
    INCREMENT_MAP,
    SET_BUN,
    INCREASE_BUN_MAP,
    DECREASE_BUN_MAP,
   
    SWITCH_INGREDIENT,
    RESET_MAP,
    ERROR_SET_INGREDIENTS,
    ERROR_MAKE_ORDER

} from '../actions/constructor';
import { IBareBurgerIngredient, IReduxState,IOrder } from '../../components/Interfaces';

export const initialState: IReduxState= {
    bun:null, ingredients:[], ingredientMap:{}, allIngredients:[], ingredientDetails:null,orderDetails:null
}



//Here I treat a bun ingredient separately.
const initialIngredients: IBareBurgerIngredient[] =[];
const initialBun: IBareBurgerIngredient | null = null;
//this is an aux object to make it easier to account for the number of ingredients of the same _id.
const initialIngredientMap: Object={};
const initialAllIngredients: IBareBurgerIngredient[] | string =[];
const initalIngredientDetails:  IBareBurgerIngredient | null = null;
const initalOrderDetails:  IOrder | null = null;

export const orderDetailsReducer = (state = initalOrderDetails, action:{type:string, payload: IOrder | null })=>{
    switch(action.type){
        case MAKE_ORDER:
            return action.payload ? {...action.payload}: null;
        case ERROR_MAKE_ORDER:
            return initalOrderDetails
        default:
            return state;
    }
    
}


export const ingredientDetailsReducer = (state = initalIngredientDetails, action:{type:string, payload:IBareBurgerIngredient | null })=>{
    switch(action.type){
        case SET_INFO_INGREDIENT:{
         if(action.payload) return {...action.payload};
         else return initalIngredientDetails;
        }
        default:
            return state;
    }
}

export const allIngredientsReducer =  (state=initialAllIngredients, action:{type:string, payload:IBareBurgerIngredient[]| string })=>{
    switch(action.type){
        case SET_INGREDIENTS:
            return  Array.isArray(action.payload)? [...action.payload]:action.payload;

        case ERROR_SET_INGREDIENTS:
            return  'error';    
        default:
            return state;
    }
}

export const bunReducer = (state=initialBun, action:{type:string, payload:IBareBurgerIngredient })=>{
    switch(action.type){       

        case SET_BUN :{
            return action.payload? {...action.payload} : null;     
        }
        
        default:
            return state;
    }
}

export const mapReducer =  (state=initialIngredientMap, action:{type:string, payload:IBareBurgerIngredient  })=>{
    switch(action.type){
       case RESET_MAP :
           return initialIngredientMap


        case DECREMENT_MAP: {
            const _id = action.payload._id;

            const tempContext = JSON.parse(JSON.stringify(state));
            if(state&& state.hasOwnProperty(_id) && state[_id]>1){
                tempContext[_id]=state[_id]-1
            }
            else if(state && state.hasOwnProperty(_id) && state[_id]===1){
              
                delete tempContext[_id];
            
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


export const ingredientReducer = (state=initialIngredients, action:any)=>{
    switch(action.type){
        case PICK_INGREDIENT :
            return [...state.concat(action.payload)]
        case RESET_INGREDIENT:
            return initialIngredients
        
        case DELETE_INGREDIENT :{
            const tempContext = JSON.parse(JSON.stringify(state));
            const index = state.findIndex(el=>{return (el._id===action.payload._id)})
   
            tempContext.splice(index,1);
            return tempContext;
        }          

        
        case SWITCH_INGREDIENT:{
                const tempContext = JSON.parse(JSON.stringify(state));
          
          tempContext[action.to] = state[action.from];
          tempContext[action.from] = state[action.to];
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