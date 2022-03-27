

export interface IChoosenIngredients{
    [key: string]: number
  }



export interface IBareBurgerIngredient{
    _id: string,
    quantity: number,
    image: string,
    price: number,
    name: string
}

export interface IBurgerIngredient extends IBareBurgerIngredient{
    relativeWidth: string,
    clickCallback: (arg: any)=>void,
    quantity: number
}