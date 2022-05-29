export const getBareIngredient=(input: IBurgerIngredient):IBareBurgerIngredient=>{
    const {relativeWidth, clickCallback,infoCallback,quantity,...rest} = input;
    return rest;
}

export interface IOrder {
    cost: number,
    orderId: number | null | string,
    success: boolean

}

export interface IUser {
    name?: string,
    email:string,
    password:string
}

export interface IChoosenIngredients{
    [key: string]: number
  }
export interface IReduxState {
    bun: IBareBurgerIngredient|null,
    ingredients:IBareBurgerIngredient[],
    ingredientMap:Object,
    allIngredients:IBareBurgerIngredient[] | string,
    ingredientDetails:IBareBurgerIngredient|null,
    orderDetails:IOrder|null
}


export interface IBareBurgerIngredient{
    _id: string,
    uuid?: string,
    quantity?: number,
    image: string,
    price: number,
    name: string,
    type: string,
    proteins?: number,
    carbohydrates?: number,
    fat?:number,
    calories?:number,
    image_mobile?:string,
    image_large?:string,
    __v?:number
}

export interface IBurgerIngredient extends IBareBurgerIngredient{
    relativeWidth: string,
    clickCallback: (arg: any)=>void,
    infoCallback: (arg:any)=>void,
    quantity: number
}

export interface IBurgerIngredientDrop extends IBareBurgerIngredient {
    index: number
}

export interface IFetchConfig extends RequestInit {
    
        method?: string;
     //   mode: string;
    //    cache: string | undefined;
     //   credentials: string;
     //   headers: Object;
     //   redirect: string;
     //   referrerPolicy: string;
        body?: any;
      
}

export interface IForm {
    [name: string]:string | number | null;
}

export interface ISuccess{
    success: boolean;
}

export interface IResponseBody extends ISuccess {
  
   
  accessToken: string;
  refreshToken: string;
}

export interface IUserResponseBody extends IResponseBody{
  
    user:IUser;
 
}
export interface IUserNoToken extends ISuccess{
    user:IUser;
}

export interface IState{
    ingredients: IBareBurgerIngredient[];
    bun: IBareBurgerIngredient | null ;
    ingredientMap: Object;
    allIngredients: IBareBurgerIngredient[] | string;
    ingredientDetails:  IBareBurgerIngredient | null ;
    orderDetails:  IOrder | null ;
    user: IUser | null;
    visited : Object;
    noConnection : boolean;
}

export type IMessage = Object;

