import { v4 as uuidv4 } from 'uuid';
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
  
  SWITCH_INGREDIENT,
  RESET_INGREDIENT,
  RESET_MAP,
  ERROR_MAKE_ORDER,
  ERROR_SET_INGREDIENTS,
  NETWORK_CONNECTION
} from './constructor';
import {Actions, TActionStrings} from './Interfaces'
import { IBareBurgerIngredient,IOrder } from '../../components/Interfaces';
import { burgerUrl } from '../../configs/urls';
import { AppThunk } from 'services/store';

export const deleteIngredient: AppThunk = (ingredient:IBareBurgerIngredient)=>(dispatch)=>{
   
    if(ingredient.type!=='bun'){
      dispatch({type:DELETE_INGREDIENT, payload:ingredient});
      dispatch({type:DECREMENT_MAP,payload:ingredient});   
    }
 
  else{

  }     
}

export const pickIngredient: AppThunk = (ingredient: IBareBurgerIngredient, bun:IBareBurgerIngredient|null)=>(dispatch)=>{
    ingredient.uuid=uuidv4();
    if(ingredient.type!=='bun'){
        dispatch({type:PICK_INGREDIENT, payload:ingredient});
        dispatch({type:INCREMENT_MAP, payload:ingredient})      
      }
    else if(ingredient.type==='bun' ){
        dispatch({type:SET_BUN, payload:ingredient});

        if(bun){ 
        dispatch({type:DECREASE_BUN_MAP, payload: bun});}
        dispatch({type:INCREASE_BUN_MAP, payload:ingredient});

    }
    else{

    }     
}

export const switchIngredients: AppThunk=(dragIndex:number, dropIndex:number)=>(dispatch)=>{
    dispatch({type:SWITCH_INGREDIENT, to: dropIndex, from:dragIndex});
}

export const  loadData: AppThunk =   (URL:string, setStatus)=>async (dispatch)=>{
  try{
   const json = await fetch(URL)
  .then(checkResponse);

      dispatch({type:SET_INGREDIENTS, payload:json.data});
      setStatus({  loading: false, error:false });
  
  }catch(error){
      dispatch({type:ERROR_SET_INGREDIENTS});
      setStatus({  loading: false, error:true });
  }
}

export const resetOrderDetails: AppThunk = ()=>(dispatch)=>{
  dispatch({type: MAKE_ORDER, payload:null})
}


export const setInfo: AppThunk=(ingredient: IBareBurgerIngredient| null)=>(dispatch)=>{
  dispatch({type:SET_INFO_INGREDIENT, payload:ingredient})
}

export const sendOrderDetails: AppThunk = (cost: number, setFetchError,allIngredients: IBareBurgerIngredient[]) =>async (dispatch)=>{
  const sendingOrder: IOrder = { 'cost': cost, 'orderId': "Отправляем заказ...", 'success': true};
  

  dispatch({type: MAKE_ORDER,payload: sendingOrder})
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + window.localStorage.getItem('accessToken') },
      body: JSON.stringify({ ingredients: allIngredients })
    };
    try{
      const data = await fetch(burgerUrl + '/orders', requestOptions)
      .then(checkResponse);
      const order: IOrder = { 'cost': cost, 'orderId': data.order.number, 'success': data.success};
      dispatch({type: MAKE_ORDER, payload:order })
      setFetchError(false);
      dispatch({type:RESET_INGREDIENT});
      dispatch({type:SET_BUN,payload:null});
      dispatch({type:RESET_MAP});

    }
    catch(error:any){
      dispatch({type:ERROR_MAKE_ORDER});
      if (!(error.message ==="server error")) {
        dispatch({type:NETWORK_CONNECTION, payload:true})
      
      }
    }
  
}

export const informOfError = (errorType:string)=>{
  return {
    type:errorType
  }
}

export const checkResponse=(response)=>{
  if (response.ok) {
    return response.json();
  }
    return Promise.reject(`Ошибка ${response.status}`);
}

export const actUponWithNull =(actionType:TActionStrings)=>{
  return {
    type:actionType,
    payload: null
  }
} 

export const actUponWithPayload = (actionType:TActionStrings,actPayload:any)=>{
  return {
    type:actionType,
    payload:actPayload
  }
}

export const actUpon=(actionType:string)=>{

  return {type:actionType}  
}
