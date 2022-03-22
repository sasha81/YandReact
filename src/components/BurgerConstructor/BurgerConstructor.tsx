

import { useState, useRef, createRef } from "react";
import {
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';
import getTestData from '../../utils/data';
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
    const sortedData = data.sort(comparator);
    
    var types = new Set(); var ingredientMap = new Map(); const resultArr : any=[];

    sortedData.forEach((el: any)=>{ types.add(el.type)})

    types.forEach(t=>{ingredientMap.set(t,[])})

    sortedData.forEach((el:any)=>{ingredientMap.get(el.type).push(el);})

    ingredientMap.forEach((val, key)=>{resultArr.push( {type:key, value: val} )})

    return [resultArr, ingredientMap];
}


export const BurgerConstructor =(props: any)=>{
    const [current, setCurrent] = useState('one')


    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const ref3 = useRef<HTMLDivElement>(null);

    const refMap = new Map();


    const getToOne = (e:any)=>{
        setCurrent("one");
        ref1.current?.scrollIntoView({behavior:"smooth"});
    }

    const getToTwo = (e:any)=>{
        setCurrent("two");
        ref2.current?.scrollIntoView({behavior:"smooth"});
    }

    const getToThree = (e:any)=>{
        setCurrent("three");
        ref3.current?.scrollIntoView({behavior:"smooth"});
    }
    const getTabCallBack= (name: string, ref: any, stateCallback)=>{
        return (e)=>{
            stateCallback(name);
            ref.current.scrollIntoView({behavior:"smooth"});
        }
    }


    const [ingredients, ingredientMap ]= getSortedData(getTestData, comparatorBurger);

    // for(let i of ingredients){
    //     refMap.set(i.type, useRef<HTMLDivElement>(null))
    // }
     
   // ingredients.forEach(i=>{refMap.set(i.type, useRef<HTMLDivElement>(null))})

   const myRefs = useRef([]);
   myRefs.current =ingredients.map((element, i) => myRefs.current[i] ?? createRef());

    return (
        <section>
            <h1>Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                {ingredients.map((i,ind)=>{
                    return (
                        <Tab key={`${i.type}`} value={`${i.type}`} active={current === `${i.type}`} onClick={getTabCallBack(i.type,myRefs.current[ind],setCurrent)}>
                        <h1 >{`${i.type}`}</h1>
                    </Tab>
                    )
                })}
                {/* <Tab value="one" active={current === 'one'} onClick={getToOne}>
                    <h1 >One</h1>
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={getToTwo}>
                    <h1>Two</h1>
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={getToThree}>
                   <h1>Three</h1> 
                </Tab> */}
            </div>
            <div style={{height:'900px', overflow:'auto'}}>
                {ingredients.map((ing,ind)=>{
                    return (
                        <div key={`${ing.type}`} id={`${ing.type}Type`} ref={ myRefs.current[ind]} >
                            <h2>{ing.type}</h2>
                                {ingredientMap.get(ing.type).map(ingred=>{
                                    return (
                                        <BurgerIngredient key={ingred.id} {...ingred}/>
                                    )
                                })}
                        </div>
                    )
                })}

                
                {/* <div id="oneDiv" ref={ref1} style={{height:'600px', backgroundColor:'blue'}}>
                    <h2>One</h2>
                </div>
                <div id="twoDiv" ref={ref2} style={{height:'600px', backgroundColor:'red'}}>
                    <h2>Two</h2>
                </div>
                <div id="threeDiv" ref={ref3} style={{height:'600px', backgroundColor:'green'}}>
                    <h2>Three</h2>
                </div> */}
            </div>
        </section>
    )
}

//export default BurgerConstructor;