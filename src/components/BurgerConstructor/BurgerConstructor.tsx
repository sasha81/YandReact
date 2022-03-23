

import { useState, useRef, createRef } from "react";
import {
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';
import {getTestData, getNames } from '../../utils/data';
import BurgerIngredient from './BurgerIngredient'

export const comparatorBurger = (a : any,b: any)=>{
    if(a.type == b.type){
        return b.price - a.price;
    }
    else if(a.type === 'bun') return -1;
    else if (a.type === 'main') return +1;

}

export const getSortedData =  (getData: any ,comparator: any  ) :any =>{
    const data = getData();
    const sortedData = data;//.sort(comparator);
    
    var types = new Set(); var ingredientMap = new Map(); const resultArr : any=[];

    sortedData.forEach((el: any)=>{ types.add(el.type)})

    types.forEach(t=>{ingredientMap.set(t,[])})

    sortedData.forEach((el:any)=>{ingredientMap.get(el.type).push(el);})
    ingredientMap.forEach((val,key)=>val.sort((a,b)=>{return a.price - b.price}))

    ingredientMap.forEach((val, key)=>{resultArr.push( {type:key, value: val} )})

    return [resultArr, ingredientMap];
}


export const BurgerConstructor =(props: any)=>{
    const [current, setCurrent] = useState('one')
  
    const getTabCallBack= (name: string, ref: any, stateCallback)=>{
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
            <h1>Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                {ingredients.map((i,ind)=>{
                    return (
                        <Tab key={`${i.type}`} value={`${i.type}`} active={current === `${i.type}`} onClick={getTabCallBack(i.type,myRefs.current[ind],setCurrent)}>
                        <h1 >{`${getNames(i.type)}`}</h1>
                    </Tab>
                    )
                })}              
            </div>
            <div style={{height:'900px', overflow:'auto'}}>
                {ingredients.map((ing,ind)=>{
                    return (
                        <div key={`${ing.type}`} id={`${ing.type}Type`} ref={ myRefs.current[ind]} >
                            <h2>{getNames(ing.type)}</h2>
                            <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap', rowGap: '20px'}}>
                                {ingredientMap.get(ing.type).map(ingred=>{
                                    const inputProps = {
                                        ...ingred,
                                        relativeWidth:'50%',
                                        clickCallback: ingedientClicked(ingred),
                                        quantity: props.pickedIngredients[ingred._id]
                                    }
                                    return (                                        
                                             <BurgerIngredient key={ingred._id} { ...inputProps } />                                       
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

