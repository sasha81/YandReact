import { useState, useRef, createRef } from "react";
import {
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';
import {getTestData, getNames } from '../../utils/data';
import {BurgerIngredient } from './BurgerIngredient';
import styles from './BurgerConstructor.module.css';

import {IChoosenIngredients,IBurgerIngredient, IBareBurgerIngredient} from '../Interfaces';

export const comparatorBurger = (a : any,b: any)=>{
    if(a.type == b.type){
        return b.price - a.price;
    }
    else if(a.type === 'bun') return -1;
    else if (a.type === 'main') return +1;

}

export const getSortedData =  (getData: any ,comparator: any  ) :any =>{
    const data = getData();
    const sortedData = data;
    
    var types = new Set(); var ingredientMap = new Map(); const resultArr : any=[];

    sortedData.forEach((el: any)=>{ types.add(el.type)})

    types.forEach(t=>{ingredientMap.set(t,[])})

    sortedData.forEach((el:any)=>{ingredientMap.get(el.type).push(el);})
    ingredientMap.forEach((val,key)=>val.sort((a,b)=>{return a.price - b.price}))

    ingredientMap.forEach((val, key)=>{resultArr.push( {type:key, value: val} )})

    return [resultArr, ingredientMap];
}

interface IBurgerConstructorProps {
    pickedIngredients: IChoosenIngredients,
    pickIngedientCallback: (arg: IBareBurgerIngredient)=> void
}


export const BurgerConstructor =(props: IBurgerConstructorProps): JSX.Element=>{
    const [current, setCurrent] = useState('one')
  
    const getTabCallBack= (name: string, ref: any, stateCallback: (arg:string)=>void)=>{
        return (e)=>{
            stateCallback(name);
            ref.current.scrollIntoView({behavior:"smooth"});
        }
    }

    const [ingredients, ingredientMap ]= getSortedData(getTestData, comparatorBurger);

   const myRefs = useRef([]);
   myRefs.current =ingredients.map((element, i) => myRefs.current[i] ?? createRef());

    const ingedientClicked = (number)=>()=>{
        props.pickIngedientCallback(number);
        
    }

    return (
        <section>
            <h1 className={styles.header}>Соберите бургер</h1>
            <div className={styles.tabContainer} >
                {ingredients.map((i,ind)=>{
                    return (
                        <Tab key={`${i.type}`} value={`${i.type}`} active={current === `${i.type}`} onClick={getTabCallBack(i.type,myRefs.current[ind],setCurrent)}>
                                <h1 >{`${getNames(i.type)}`}</h1>
                    </Tab>
                    )
                })}              
            </div>
            <div className={styles.mainTabContainer} >
                {ingredients.map((ing,ind)=>{
                    return (
                        <div key={`${ing.type}`} id={`${ing.type}Type`} ref={ myRefs.current[ind]} >
                            <h2>{getNames(ing.type)}</h2>
                            <div  className={styles.innerIngredientContainer} >
                                {ingredientMap.get(ing.type).map(ingredient=>{
                                    const inputProps = {
                                        ...ingredient,
                                        relativeWidth: styles.ingredientWidth,
                                        clickCallback: ingedientClicked(ingredient),
                                        quantity: props.pickedIngredients[ingredient._id]
                                    }
                                    return (                                        
                                             <BurgerIngredient key={ingredient._id} { ...inputProps } />                                       
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

