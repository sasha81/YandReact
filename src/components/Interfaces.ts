export const getBareIngredient=(input: IBurgerIngredient):IBareBurgerIngredient=>{
    const {relativeWidth, clickCallback,infoCallback,quantity,...rest} = input;
    return rest;
}

export interface IOrder {
    cost: number,
    orderId: number | null,
    success: boolean

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

