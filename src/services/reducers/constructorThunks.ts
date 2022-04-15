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
  ERROR_SET_INGREDIENTS
} from '../actions/constructor';
import { IBareBurgerIngredient } from '../../components/Interfaces';
import { burgerUrl } from '../../configs/urls';

export const deleteIngredient = (ingredient:IBareBurgerIngredient)=>(dispatch)=>{
   
    if(ingredient.type!=='bun'){
      dispatch({type:DELETE_INGREDIENT, payload: ingredient});
    dispatch({type:DECREMENT_MAP, payload: ingredient});   
    }
 
  else{

  }     
}

export const pickIngredient = (ingredient: IBareBurgerIngredient, bun:IBareBurgerIngredient|null)=>(dispatch)=>{
    if(ingredient.type!=='bun'){
        dispatch({type:PICK_INGREDIENT, payload: ingredient});
        dispatch({type:INCREMENT_MAP, payload: ingredient})      
      }
    else if(ingredient.type==='bun' ){
        dispatch({type:SET_BUN, payload: ingredient});

        if(bun){ dispatch({type:DECREASE_BUN_MAP, payload: bun});}
        dispatch({type:INCREASE_BUN_MAP, payload: ingredient});

    }
    else{

    }     
}

export const switchIngredients=(dragIndex:number, dropIndex:number)=>(dispatch)=>{
    dispatch({type:SWITCH_INGREDIENT, to: dropIndex, from:dragIndex});
}

export const loadData =  (URL:string, setStatus)=>(dispatch)=>{
    fetch(URL)
    .then(res=>res.json())
    .then(json=>{
        dispatch({type:SET_INGREDIENTS, payload:json.data});
        setStatus({  loading: false, error:false });
    })
    .catch(error=>{
        dispatch({type:ERROR_SET_INGREDIENTS});
        setStatus({  loading: false, error:true });
    })
}
export const resetOrderDetails = ()=>(dispatch)=>{
  dispatch({type: MAKE_ORDER, payload:null})
}


export const setInfo=(ingredient: IBareBurgerIngredient| null)=>(dispatch)=>{
  dispatch({type:SET_INFO_INGREDIENT, payload: ingredient})
}

export const sendOrderDetails = (cost: number, setFetchError,allIngredients: IBareBurgerIngredient[]) =>(dispatch)=>{
    

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: allIngredients })
    };
    fetch(burgerUrl + '/orders', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw Error("server error")
        }

        return response.json()
      })
      .then(data => {

        dispatch({type: MAKE_ORDER, payload:{ 'cost': cost, 'orderId': data.order.number, 'success': data.success }})
        setFetchError(false);
        dispatch({type:RESET_INGREDIENT});
        dispatch({type:SET_BUN, payload:null});
        dispatch({type:RESET_MAP});

       // orderComplete(allIngredients, setIngredientContext)
      })
      .catch(error => {
        if (error.message === "server error") {
            dispatch({type: ERROR_MAKE_ORDER});
        }
        else {
          setFetchError(true);
          dispatch({type: ERROR_MAKE_ORDER});
        }
      })
}
