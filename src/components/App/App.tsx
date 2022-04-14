import React, {useState,useEffect} from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import {useSelector, useDispatch} from 'react-redux';

import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader'

import { BurgerConstructor} from '../BurgerConstructor/BurgerConstructor'

import {BurgerIngredients} from '../BurgerIngredients/BurgerIngredients'

import { IBareBurgerIngredient} from '../Interfaces';
import {IngredientContextProvider} from '../../utils/contexts';
import {burgerUrl} from '../../configs/urls';
import {RootState} from '../../index';
import {loadData} from '../../services/reducers/constructorThunks'

interface IAppDataAndStatus{
 // productData:IBareBurgerIngredient[] | null | string,
  error: boolean,
  loading: boolean
}


const URL = burgerUrl+'/ingredients';

const App=(): JSX.Element=> {

const [order, completeOrder] = useState(false);
const [status, setStatus] = useState<IAppDataAndStatus>({ error: false, loading: false})
const data = useSelector((state: RootState)=>state.allIngredients)
const dispatch = useDispatch();

useEffect(()=>{
  // const getProductData = async () => {
  //   setDataAndStatus(prev=> { return {...prev, loading: true}});
  //   try{
  //     const res = await fetch(URL);
  //     const data = await res.json();
  //     setDataAndStatus({ productData: data.data, loading: false, error:false });
  //   }
  //   catch(e){
  //     setDataAndStatus({ productData: 'error', loading: false, error:true });
  //   }
  // }

  //getProductData();
  dispatch(loadData(URL,setStatus));
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
      <DndProvider backend={HTML5Backend}>
          <IngredientContextProvider>
              <div className={styles.ingredientsBurger}>
              {getIngredients(data)}
              
                </div>
              <div className={styles.constructorBurger}><BurgerConstructor /></div>
            </IngredientContextProvider>
          {order && <h1 className={styles.appHeader}>Order Complete!</h1>}
        </DndProvider>
    </div>
  );
}

export default App;
