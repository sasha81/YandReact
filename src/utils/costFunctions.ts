import { IBareBurgerIngredient } from 'components/Interfaces';

export const getOrderCost=(allIngredients: IBareBurgerIngredient[],ingredientIDs:string[]): number=>{
    return ingredientIDs.reduce((acc,ingredient)=>{
        const ingredCost = allIngredients.find(ingred=>ingred._id===ingredient)?.price;
        if(ingredCost) acc = acc+ ingredCost;
        return acc;

    },0 as number);
}