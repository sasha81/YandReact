import { IBareBurgerIngredient, IOrder } from 'components/Interfaces';
import {burgerUrl as URL} from 'configs/urls';

export const allIngredientsURL = URL + '/ingredients';
export const orderURL = URL+'/orders';
export const orderNumber = "123";

export const generateIngredient=(x:string ):IBareBurgerIngredient=>{
    const ingredient:IBareBurgerIngredient={
        _id:"abcd"+x,
        name:x+"frg",
        image:"erf",
        price:parseFloat(x),
        type:x

    }
    return ingredient;
}

export const generateBareOrder = (x:string):IOrder=>{
  return {
      success:true,
      orderId: "abcd"+x,
      cost:parseFloat(x) 
  }
}

export const generateOrder = (x:string)=>{
    return {
        success:true,
        order:{
            number:parseInt(x)
        }
    }
}
export const mockIngredients = [generateIngredient("1"),generateIngredient("2")]

export async function mockFetch(url,options?) {
    switch (url) {
      case allIngredientsURL: {
       
      //  const user = [generateIngredient("1"),generateIngredient("2")]
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({data:mockIngredients}),
        })
      }
    
     
        case orderURL: {
     
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => (generateOrder(orderNumber))
          })
        }  
       
    }
  }