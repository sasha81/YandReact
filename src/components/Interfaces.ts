

export interface IChoosenIngredients{
    [key: string]: number
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
    quantity: number
}