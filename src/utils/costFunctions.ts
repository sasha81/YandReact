import { IBareBurgerIngredient } from 'components/Interfaces';

export const getOrderCost=(allIngredients: IBareBurgerIngredient[],ingredientIDs:string[]): number=>{
    return ingredientIDs.reduce((acc,ingredient)=>{
        const ingredCost = allIngredients.find(ingred=>ingred._id===ingredient)?.price;
        if(ingredCost) acc = acc+ ingredCost;
        return acc;

    },0 as number);
}

export const prittifyDate=(inputTime:string):string=>{
    const reminder = inputTime.split("T")[1];
    const today = new Date();
    const dateToday = today.getDate();
    const inputDate = parseInt(inputTime.split("-")[2]);
    if(dateToday===inputDate) return 'Сегодня, '+reminder;
    else if(dateToday-inputDate===1) return 'Вчера, '+reminder;
    else return inputTime;

}