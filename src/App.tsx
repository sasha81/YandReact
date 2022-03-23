import React, {useState} from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import { BurgerIngredients} from './components/BurgerIngredients/BurgerIngredients';
import {BurgerConstructor} from './components/BurgerConstructor/BurgerConstructor';
import {getTestData, getNames } from './utils/data';

function App() {
const [choosenIngredients, setIngredient]= useState({});
const [choosenIngredientObjects, setIngredientObjects]= useState<any[]>([]);

const pickIngredient = (ing) =>{
  const _id = ing._id
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
    if(!choosenIngredients.hasOwnProperty(ing._id)) {
      return [...prev, ing]
    }
    else{
      return [...prev];
    }
  })
}

// const getIngredientObjects = (idArr: string[], objArr: any[])=>{
//   const result = idArr.reduce((accum, curr)=>{
//       const found = objArr.find(el=>{el._id==curr});
//       if(found){ accum.push(found)}
//       return accum;
//   },[] as  any)
//   return result;
// }

  return (
    <div className={styles.App}>
      <div className={styles.headerBurger}> <AppHeader  /> </div>
     
      <div className={styles.constructorBurger}><BurgerConstructor pickedIngredients={choosenIngredients} pickIngedientCallback={pickIngredient} /></div>
      <div className={styles.ingredientsBurger}><BurgerIngredients ingredients = {choosenIngredientObjects}/></div>
    </div>
  );
}

export default App;
