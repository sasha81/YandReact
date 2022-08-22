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
   
   
    SWITCH_INGREDIENT,
    RESET_MAP,
    ERROR_SET_INGREDIENTS,
    ERROR_MAKE_ORDER,
    UPDATE_USER,
 
    NETWORK_CONNECTION,
    DECREASE_BUN_MAP,
    INCREASE_BUN_MAP

} from '../actions/constructor';
import {Reducer} from 'redux'
import { IBareBurgerIngredient, IReduxState,IOrder, IUser, IState } from '../../components/Interfaces';
import {IAction, IBareAction, IDecreaseBntMap, IIncreaseBunMap} from 'services/actions/Interfaces';
import {RootState} from 'services/store'
import {Actions,INetworkConnection ,
    IPickIngredient,
    IDeleteIngredient,
    IErrorSetIngredients,
    ISwitchIngredient,
    IResetIngredients,
    IErrorMakeOrder,
    IMakeOrder,
    IUpdateUser,
    ISetInfoIngredient,
    ISetBun,
    ISetIngredients,
    IIncrementMap,
    IDecrementMap,
    IResetMap} from 'services/actions/Interfaces'





//Here I treat a bun ingredient separately.
export const initialIngredients: IBareBurgerIngredient[] =[];
export const initialBun: IBareBurgerIngredient | null = null;
//this is an aux object to make it easier to account for the number of ingredients of the same _id.
export const initialIngredientMap: Object={};
const initialAllIngredients: IBareBurgerIngredient[] | string =[];
export const initalIngredientDetails:  IBareBurgerIngredient | null = null;
export const initalOrderDetails:  IOrder | null = null;
export const initialUser: IUser | null = null;
const initialVisited : Object = {};
export const initialNetworkError : boolean=false; 

//:Reducer< boolean,IAction<boolean>>
export const noConnectionReducer = (state:boolean = initialNetworkError, action:INetworkConnection):boolean=>{
    switch(action.type){
        case NETWORK_CONNECTION:{
            if(action.payload) return true;
            else return false;
        }
        default: 
        return state;
    }
}




export const securityUserReducer = (state: IUser | null= initalOrderDetails, action:IUpdateUser): IUser | null=>{
    switch(action.type){
        case UPDATE_USER:
            return action.payload ? {...action.payload}: initialUser;
        default:
            return state;     
    }
}

export const orderDetailsReducer= (state: IOrder | null = initalOrderDetails, action:IErrorMakeOrder| IMakeOrder):IOrder | null=>{
    switch(action.type){
        case MAKE_ORDER:
            return action.payload ? {...action.payload}: null;
        case ERROR_MAKE_ORDER:
            return initalOrderDetails
        default:
            return state;
    }
    
}


export const ingredientDetailsReducer = (state:  IBareBurgerIngredient | null = initalIngredientDetails, action:ISetInfoIngredient):  IBareBurgerIngredient | null=>{
    switch(action.type){
        case SET_INFO_INGREDIENT:{
         if(action.payload) return {...action.payload};
         else return initalIngredientDetails;
        }
        default:
            return state;
    }
}

export const allIngredientsReducer =  (state=initialAllIngredients, action:IErrorSetIngredients |ISetIngredients): IBareBurgerIngredient[] | string=>{
    switch(action.type){
        case SET_INGREDIENTS:
            return  Array.isArray(action.payload)? [...action.payload]:action.payload;

        case ERROR_SET_INGREDIENTS:
            return  'error';    
        default:
            return state;
    }
}

export const bunReducer = (state:IBareBurgerIngredient | null =initialBun, action:ISetBun):IBareBurgerIngredient | null=>{
    switch(action.type){       

        case SET_BUN :{
            return action.payload? {...action.payload} : null;     
        }
        
        default:
            return state;
    }
}

export const mapReducer =  (state: Object=initialIngredientMap, action:IIncrementMap|IDecrementMap| IResetMap|IIncreaseBunMap|
    IDecreaseBntMap): Object=>{
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


export const ingredientReducer = (state: IBareBurgerIngredient[]=initialIngredients, action:IPickIngredient| IDeleteIngredient| ISwitchIngredient| IResetIngredients)=>{
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


// export const updateIngredientReducer = (state: IReduxState=initialState, action:{type:string,to:number, from:number})=>{
//     switch(action.type){
//         case SWITCH_INGREDIENT:{
//             const tempContext = JSON.parse(JSON.stringify(state));
      
//       tempContext.ingredients[action.to] = state.ingredients[action.from];
//       tempContext.ingredients[action.from] = state.ingredients[action.to];
//       return tempContext;
//         }
//     }
// }

// export const constructorIngredientArrayReducer = (state: IReduxState=initialState, action :IAction<IBareBurgerIngredient[] | string>)=>{
//     switch(action.type){
//         case SET_INGREDIENTS:
//             return {...state, allIngredients: Array.isArray(action.payload)? [...action.payload]:action.payload};
//         default:
//             return state;
//     }
// }