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
import { IBareBurgerIngredient,IOrder } from '../../components/Interfaces';
import { burgerUrl } from '../../configs/urls';

export const deleteIngredient = (ingredient:IBareBurgerIngredient)=>(dispatch)=>{
   
    if(ingredient.type!=='bun'){
      dispatch(actUponWithPayload(DELETE_INGREDIENT, ingredient));
      dispatch(actUponWithPayload(DECREMENT_MAP,ingredient));   
    }
 
  else{

  }     
}

export const pickIngredient = (ingredient: IBareBurgerIngredient, bun:IBareBurgerIngredient|null)=>(dispatch)=>{
    ingredient.uuid=uuidv4();
    if(ingredient.type!=='bun'){
        dispatch(actUponWithPayload(PICK_INGREDIENT, ingredient));
        dispatch(actUponWithPayload(INCREMENT_MAP, ingredient))      
      }
    else if(ingredient.type==='bun' ){
        dispatch(actUponWithPayload(SET_BUN, ingredient));

        if(bun){ 
        dispatch(actUponWithPayload(DECREASE_BUN_MAP,  bun));}
        dispatch(actUponWithPayload(INCREASE_BUN_MAP, ingredient));

    }
    else{

    }     
}

export const switchIngredients=(dragIndex:number, dropIndex:number)=>(dispatch)=>{
    dispatch({type:SWITCH_INGREDIENT, to: dropIndex, from:dragIndex});
}

export const loadData =  (URL:string, setStatus)=>(dispatch)=>{
  fetch(URL)
  .then(checkResponse)
  .then(json=>{
      dispatch(actUponWithPayload(SET_INGREDIENTS, json.data));
      setStatus({  loading: false, error:false });
  })
  .catch(error=>{
      dispatch(actUpon(ERROR_SET_INGREDIENTS));
      setStatus({  loading: false, error:true });
  })
}
export const resetOrderDetails = ()=>(dispatch)=>{
  dispatch(actUponWithNull( MAKE_ORDER))
}


export const setInfo=(ingredient: IBareBurgerIngredient| null)=>(dispatch)=>{
  dispatch(actUponWithPayload(SET_INFO_INGREDIENT, ingredient))
}

export const sendOrderDetails = (cost: number, setFetchError,allIngredients: IBareBurgerIngredient[]) =>(dispatch)=>{
  const sendingOrder: IOrder = { 'cost': cost, 'orderId': "Отправляем заказ...", 'success': true};
  

  dispatch(actUponWithPayload( MAKE_ORDER, sendingOrder))
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + window.localStorage.getItem('accessToken') },
      body: JSON.stringify({ ingredients: allIngredients })
    };
    fetch(burgerUrl + '/orders', requestOptions)
      .then(checkResponse)
      .then(data => {
        const order: IOrder = { 'cost': cost, 'orderId': data.order.number, 'success': data.success};
        dispatch(actUponWithPayload( MAKE_ORDER,order ))
        setFetchError(false);
        dispatch(actUpon(RESET_INGREDIENT));
        dispatch(actUponWithNull(SET_BUN));
        dispatch(actUpon(RESET_MAP));
      
      })
      .catch(error => {
        dispatch(informOfError(ERROR_MAKE_ORDER));
        if (!(error.message ==="server error")) {
          dispatch(actUponWithPayload(NETWORK_CONNECTION,true))
         // setFetchError(true);
        }
       
      })
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

export const actUponWithNull =(actionType:string)=>{
  return {
    type:actionType,
    payload: null
  }
} 

export const actUponWithPayload = (actionType:string,actPayload:any)=>{
  return {
    type:actionType,
    payload:actPayload
  }
}

export const actUpon=(actionType:string)=>{

  return {type:actionType}  
}
