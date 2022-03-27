import React, {useState} from 'react';

import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader'

import { BurgerIngredients} from '../BurgerIngredients/BurgerIngredients'

import {BurgerConstructor} from '../BurgerConstructor/BurgerConstructor'
import {getTestData, getNames } from '../../utils/data';
import {IChoosenIngredients, IBareBurgerIngredient} from '../Interfaces'

// export interface IChoosenIngredients{
//   [key: string]: number
// }

const App=(): JSX.Element=> {
const [choosenIngredients, setIngredient]= useState<IChoosenIngredients>({});
const [choosenIngredientObjects, setIngredientObjects]= useState<IBareBurgerIngredient[]>([]);
const [order, completeOrder] = useState(false);

const pickIngredient = (ingredient: IBareBurgerIngredient):void =>{
  const _id = ingredient._id
  setIngredient(prev=>{
    if(prev.hasOwnProperty(_id)){
      return {
        ...prev,
        [_id]: prev[_id]+1
      }
    }
    else{
      return {
        ...prev,
        [_id]:1
      }
    }
  });
  setIngredientObjects((prev)=>{
    return [...prev, ingredient]   
  })
}

const deleteIngredient = (ingredient:IBareBurgerIngredient)=>():void=>{
  const _id = ingredient._id;
  setIngredient(prev=>{
    if(prev.hasOwnProperty(_id) && prev[_id]>1){
      return {
        ...prev,
        [_id]: prev[_id]-1
      }
    }
    else if(prev.hasOwnProperty(_id) && prev[_id]===1){
      const obj = {...prev};
      delete obj[_id];
      return obj
    }
    else{
      return {...prev}
    }
  });
  setIngredientObjects((prev)=>{
    const index = prev.findIndex(el=>{return (el._id===_id)})
    const tempArr = [...prev]
    tempArr.splice(index,1);
    return tempArr;
   
  })
}

const orderComplete = ():void=>{
    console.log("This burger order is sent to the server: ", choosenIngredientObjects);
    completeOrder(true);
    setIngredient({});
    setIngredientObjects([])
    setTimeout(()=>{
      completeOrder(false);
    }, 2000);
}

  return (
    <div className={styles.App}>
      <div className={styles.headerBurger}> <AppHeader  /> </div>
     
      <div className={styles.constructorBurger}><BurgerConstructor pickedIngredients={choosenIngredients} pickIngedientCallback={pickIngredient} /></div>
      <div className={styles.ingredientsBurger}><BurgerIngredients ingredients = {choosenIngredientObjects} deleteIngredient={deleteIngredient} orderComplete={orderComplete}/></div>
    {order && <h1 style={{position:'absolute', top:'300px', left:'440px', backgroundColor:'blue', padding:'30px', borderRadius: '30px'}}>Order Complete!</h1>}
    </div>
  );
}

export default App;
