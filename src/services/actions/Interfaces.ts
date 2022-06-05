import { Action, AnyAction, Middleware } from 'redux';
import {IUserResponseBody, IForm,IUser,IBareBurgerIngredient,IOrder} from 'components/Interfaces';
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
    ERROR_MAKE_ORDER,
    UPDATE_USER,
    UPDATE_VISIT,
    RESET_VISITS,
    NETWORK_CONNECTION
  } from './constructor';
import { WsActionStrings } from 'utils/wsMiddleware';

export type TActionStrings=typeof PICK_INGREDIENT |
                            typeof RESET_INGREDIENT |
                            typeof SET_INGREDIENTS|
                            typeof DELETE_INGREDIENT|
                            typeof SET_INFO_INGREDIENT|
                            typeof MAKE_ORDER|
                            typeof DECREMENT_MAP|
                            typeof INCREMENT_MAP|
                            typeof SET_BUN|
                            typeof SWITCH_INGREDIENT|
                            typeof SWITCH_INGREDIENT|                            
                            typeof RESET_MAP|
                            typeof ERROR_SET_INGREDIENTS|
                            typeof ERROR_MAKE_ORDER|
                            typeof UPDATE_USER|  typeof RESET_MAP|
                            typeof ERROR_SET_INGREDIENTS|
                            typeof ERROR_MAKE_ORDER|
                            typeof UPDATE_USER|
                            typeof NETWORK_CONNECTION |typeof INCREASE_BUN_MAP|
                            typeof DECREASE_BUN_MAP

export interface IAction<T> extends Action{
      payload: T;
}
export interface IBareAction{
    type:string;
}

//export type Actions = IAction<IUser> | IAction<null> | Action;
export type Actions =INetworkConnection |
IPickIngredient|
IDeleteIngredient|
IErrorSetIngredients|
ISwitchIngredient|
IResetIngredients|
IErrorMakeOrder|
IMakeOrder|
IUpdateUser|
ISetInfoIngredient|
ISetBun|
ISetIngredients|
IIncrementMap|
IDecrementMap|
IResetMap|
IIncreaseBunMap|
IDecreaseBntMap
;

export type TSocketActionPayload={
  url:string;
  actionNames:WsActionStrings;
  
}

export interface INetworkConnection {
    readonly type: typeof NETWORK_CONNECTION;
    readonly payload: boolean;
  }

export interface IPickIngredient {
    readonly type: typeof PICK_INGREDIENT;
    readonly payload: IBareBurgerIngredient;
  }
export interface IDeleteIngredient {
    readonly type: typeof DELETE_INGREDIENT;
    readonly payload: IBareBurgerIngredient;
  }

  export interface IErrorSetIngredients {
    readonly type: typeof ERROR_SET_INGREDIENTS;
    readonly payload?: string;
  }

  export interface ISwitchIngredient {
    readonly type: typeof SWITCH_INGREDIENT;
    readonly from:number;
    readonly to:number;
  }

  export interface IResetIngredients {
    readonly type: typeof RESET_INGREDIENT;
    
  }
  export interface IErrorMakeOrder {
    readonly type: typeof ERROR_MAKE_ORDER;
    
  }
  
  export interface IMakeOrder {
    readonly type: typeof MAKE_ORDER;
    readonly payload: IOrder|null;
  }

  export interface IUpdateUser {
    readonly type: typeof UPDATE_USER;
    readonly payload: IUser;
  }

  export interface ISetInfoIngredient {
    readonly type: typeof SET_INFO_INGREDIENT;
    readonly payload: IBareBurgerIngredient|null;
  }

  export interface ISetIngredients {
    readonly type: typeof SET_INGREDIENTS;
    readonly payload: IBareBurgerIngredient[];
  }
  export interface ISetBun {
    readonly type: typeof SET_BUN;
    readonly payload: IBareBurgerIngredient|null;
  }
  export interface IIncrementMap {
    readonly type: typeof INCREMENT_MAP;
    readonly payload: IBareBurgerIngredient;
  }
  export interface IDecrementMap {
    readonly type: typeof DECREMENT_MAP;
    readonly payload: IBareBurgerIngredient;
  }
  export interface IIncreaseBunMap {
    readonly type: typeof INCREASE_BUN_MAP;
    readonly payload: IBareBurgerIngredient;
  }
  export interface IDecreaseBntMap {
    readonly type: typeof DECREASE_BUN_MAP;
    readonly payload: IBareBurgerIngredient;
  }
  export interface IResetMap {
    readonly type: typeof RESET_MAP;
   
  }





