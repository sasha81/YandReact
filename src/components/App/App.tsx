import React, {useState,useEffect} from 'react';

import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader'

import { BurgerConstructor} from '../BurgerConstructor/BurgerConstructor'

import {BurgerIngredients} from '../BurgerIngredients/BurgerIngredients'

import { IBareBurgerIngredient} from '../Interfaces';
import {IngredientContextProvider} from '../../utils/contexts';
import {burgerUrl} from '../../configs/urls';

interface IAppDataAndStatus{
  productData:IBareBurgerIngredient[] | null | string,
  error: boolean,
  loading: boolean
}


const URL = burgerUrl+'/ingredients';

const App=(): JSX.Element=> {

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

const getIngredients=(data:IBareBurgerIngredient[] | null | string)=>{
  if(data==null) return (<h1>Loading...</h1>);
  if(typeof data === 'string' || data instanceof String) return (<h1>Can't load data... Please come later.</h1>)
  
  return (
    <BurgerIngredients data={data}  />
  );
}

  return (
    <div className={styles.App}>
      <div className={styles.headerBurger}> <AppHeader  /> </div>
     <IngredientContextProvider>
        <div className={styles.ingredientsBurger}>
        {getIngredients(dataAndStatus.productData)}
        
          </div>
        <div className={styles.constructorBurger}><BurgerConstructor /></div>
      </IngredientContextProvider>
    {order && <h1 className={styles.appHeader}>Order Complete!</h1>}
    </div>
  );
}

export default App;
