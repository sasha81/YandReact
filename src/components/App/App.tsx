import React, {useState,useEffect} from 'react';

import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader'

import { BurgerConstructor} from '../BurgerConstructor/BurgerConstructor'

import {BurgerIngredients} from '../BurgerIngredients/BurgerIngredients'

import {IChoosenIngredients, IBareBurgerIngredient} from '../Interfaces'

interface IAppDataAndStatus{
  productData:IBareBurgerIngredient[] | null | string,
  error: boolean,
  loading: boolean
}


const URL = 'https://norma.nomoreparties.space/api/ingredients';

const App=(): JSX.Element=> {
const [choosenIngredients, setIngredient]= useState<IChoosenIngredients>({});
const [bun, setBun]= useState<IBareBurgerIngredient | null>(null);
const [choosenIngredientObjects, setIngredientObjects]= useState<IBareBurgerIngredient[]>([]);
const [order, completeOrder] = useState(false);
const [dataAndStatus, setDataAndStatus] = useState<IAppDataAndStatus>({productData:null, error: false, loading: false})

useEffect(()=>{
  const getProductData = async () => {
    setDataAndStatus(prev=> { return {...prev, loading: true}});
    try{
      const res = await fetch(URL);
      const data = await res.json();
      setDataAndStatus({ productData: data.data, loading: false, error:false });
    }
    catch(e){
      setDataAndStatus({ productData: 'error', loading: false, error:true });
    }
  }

  getProductData();
},[])

const pickIngredient = (ingredient: IBareBurgerIngredient):void =>{
  const _id = ingredient._id
  if(ingredient.type!=='bun'){
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
          });
  }
    else if(ingredient.type==='bun' && bun==null){
      setBun({...ingredient});
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
    }
    else{

    }
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
    setIngredientObjects([]);
    setBun(null);
    setTimeout(()=>{
      completeOrder(false);
    }, 2000);
}

const getIngredients=(data:IBareBurgerIngredient[] | null | string, choosenIngredients, pickIngredient)=>{
    if(data==null) return (<h1>Loading...</h1>);
    if(typeof data === 'string' || data instanceof String) return (<h1>Can't load data... Please come later.</h1>)
    
    return (
      <BurgerIngredients data={data} pickedIngredients={choosenIngredients} pickIngedient={pickIngredient} />
    );
}

  return (
    <div className={styles.App}>
      <div className={styles.headerBurger}> <AppHeader  /> </div>
     
      <div className={styles.ingredientsBurger}>
       {getIngredients(dataAndStatus.productData,choosenIngredients,pickIngredient)}
       
        </div>
      <div className={styles.constructorBurger}><BurgerConstructor bun={bun} ingredients = {choosenIngredientObjects} deleteIngredient={deleteIngredient} orderComplete={orderComplete}/></div>
    {order && <h1 style={{position:'absolute', top:'300px', left:'440px', backgroundColor:'blue', padding:'30px', borderRadius: '30px'}}>Order Complete!</h1>}
    </div>
  );
}

export default App;
