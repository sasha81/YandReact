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
const [order, completeOrder] = useState(false);

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
    return [...prev, ing]   
  })
}

const deleteIngredient = (ing)=>()=>{
  const _id = ing._id;
  setIngredient(prev=>{
    if(prev.hasOwnProperty(_id) && prev[_id]>1){
      return {
        ...prev,
        [_id]: prev[_id]-1
      }
    }
    else if(prev.hasOwnProperty(_id) && prev[_id]==1){
      var obj = {...prev};
      delete obj[_id];
      return obj
    }
    else{
      return {...prev}
    }
  });
  setIngredientObjects((prev)=>{
    const index = prev.findIndex(el=>{return (el._id==_id)})
    const tempArr = [...prev]
    tempArr.splice(index,1);
    return tempArr;
   
  })
}

const orderComplete = ()=>{
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
