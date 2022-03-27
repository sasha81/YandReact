import { useState, useRef, createRef } from "react";
import {
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';
import {getTestData, getNames } from '../../utils/data';
import {BurgerIngredient } from './BurgerIngredient';
import styles from './BurgerIngredients.module.css';

import {IChoosenIngredients,IBurgerIngredient, IBareBurgerIngredient} from '../Interfaces';

interface IResult {
    type: string,
    value: IBareBurgerIngredient[]
}



export const getSortedData =  (getData: (()=>IBareBurgerIngredient[] ) ) :any =>{
    const data = getData();
    const sortedData = data;
    
    var types = new Set(); var ingredientMap = new Map(); const resultArr : IResult[]=[];

    sortedData.forEach((el: IBareBurgerIngredient)=>{ types.add(el.type)})

    types.forEach(t=>{ingredientMap.set(t,[])})

    sortedData.forEach((el:IBareBurgerIngredient)=>{ingredientMap.get(el.type).push(el);})
    ingredientMap.forEach((val,key)=>val.sort((a,b)=>{return a.price - b.price}))

    ingredientMap.forEach((val, key)=>{resultArr.push( {type:key, value: val} )})

    return [resultArr, ingredientMap];
}

interface IBurgerIngredientsProps {
    pickedIngredients: IChoosenIngredients,
    pickIngedient: (arg: IBareBurgerIngredient)=> void
}


export const BurgerIngredients =(props: IBurgerIngredientsProps): JSX.Element=>{
    const [current, setCurrent] = useState('one')
  
    const getTab= (name: string, ref: any, setState: (arg:string)=>void)=>{
        return (e)=>{
            setState(name);
            ref.current.scrollIntoView({behavior:"smooth"});
        }
    }

    const [ingredients, ingredientMap ]= getSortedData(getTestData);

   const myRefs = useRef([]);
   myRefs.current =ingredients.map((element:IBareBurgerIngredient, index: number) => myRefs.current[index] ?? createRef());

    const ingedientClicked = (ingredient: IBareBurgerIngredient)=>():void=>{
        props.pickIngedient(ingredient);
        
    }

    return (
        <section>
            <p className={"text text_type_main-large "+ styles.header} >Соберите бургер</p>
            <div className={styles.tabContainer} >
                {ingredients.map((ingredient,ind)=>{
                    return (
                        <Tab key={`${ingredient.type}`} value={`${ingredient.type}`} active={current === `${ingredient.type}`} onClick={getTab(ingredient.type,myRefs.current[ind],setCurrent)}>
                               <p className="text text_type_main-default">{`${getNames(ingredient.type)}`}</p>
                    </Tab>
                    )
                })}              
            </div>
            <div className={styles.mainTabContainer} >
                {ingredients.map((ingredientOuter: IBareBurgerIngredient,index: number)=>{
                    return (
                        <div key={`${ingredientOuter.type}`} id={`${ingredientOuter.type}Type`} ref={ myRefs.current[index]} >
                            <p className={"text text_type_main-medium "+ styles.header}>{getNames(ingredientOuter.type)}</p>
                            <div  className={styles.innerIngredientContainer} >
                                {ingredientMap.get(ingredientOuter.type).map((ingredient: IBareBurgerIngredient)=>{
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

