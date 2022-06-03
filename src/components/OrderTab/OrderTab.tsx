import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { IBareBurgerIngredient } from 'components/Interfaces';
import React from 'react';
import {useSelector, useDispatch} from 'services/store';
import styles from './OrderTab.module.css';

interface IOrderTab{
    ingredients:string[];
    name?:string;
    status?:string;
    price:number;
    date:string;
    id:string;
}

const statusMap= new Map<string,string>();
statusMap.set("done","Выполнен");
statusMap.set("created","Готовиться");
statusMap.set("pending","Отменен");

const colorMap = new Map<string,string>();
colorMap.set("done","green");
colorMap.set("created","white");
colorMap.set("pending","red");




function OrderTab({ingredients,name,price,date,id,status}:IOrderTab) {

   
    const allIngredients = useSelector((store)=>store.allIngredients as IBareBurgerIngredient[]);
    const ingredientPictures = allIngredients.reduce((accumArr,ingredient)=>{
        if(ingredients.includes(ingredient._id)){ accumArr=accumArr.concat(ingredient.image);}
        return accumArr;
    },[] as string[]);

    return (
        <div className={styles.background}>
            <p className={`text text_type_digits-small ${styles.floatLeft}`}>#{id}</p>
            <p className={`text text_type_digits-small ${styles.floatRight}`}>{date}</p>
            <p className={`text text_type_digits-default ${styles.name}`}>{name}</p>
            {status &&  <p className={`text text_type_digits-default ${colorMap.has(status) ? styles[colorMap.get(status)!] :'' }`}>{statusMap.get(status)}</p>}
            <div className={styles.imageContainer}>
                
                {ingredientPictures.map((picture,index)=>{
                    return ( <div key={index} className={styles.imageWrapper}>  <img  className={styles.image} src={picture} /> </div>)
                })}
            </div>
            <div className={styles.price}>
                 <p className={`text text_type_digits-default`}>{price}</p>
                 <CurrencyIcon type="primary" />
            </div>
           
            <p className={styles.clear}></p>

        </div>
    )
}

export default OrderTab
