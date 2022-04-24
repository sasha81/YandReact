import React, {useState,useEffect} from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import {useSelector, useDispatch} from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader'

import { BurgerConstructor} from '../BurgerConstructor/BurgerConstructor'

import {BurgerIngredients} from '../BurgerIngredients/BurgerIngredients'

import { IBareBurgerIngredient} from '../Interfaces';

import {burgerUrl} from '../../configs/urls';
import {RootState} from '../../services/store';
import {loadData} from '../../services/actions/constructorThunks'
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import ResetPassword from '../ResetPassword/ResetPassword';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import Register from '../Register/Register';

interface IAppDataAndStatus{
  error: boolean,
  loading: boolean
}


const URL = burgerUrl+'/ingredients';

const App=(): JSX.Element=> {

const [order] = useState(false);
const [, setStatus] = useState<IAppDataAndStatus>({ error: false, loading: false})
const data = useSelector((state: RootState)=>state.allIngredients)
const dispatch = useDispatch();

useEffect(()=>{
  
  dispatch(loadData(URL,setStatus));
},[dispatch])

const getIngredients=(data:IBareBurgerIngredient[] | null | string)=>{
  if(data==null) return (<h1>Loading...</h1>);
  if(typeof data === 'string' || data instanceof String) return (<h1>Can't load data... Please come later.</h1>)
  
  return (
    <BurgerIngredients   />
  );
}

  return (
    
       <Router>
         <div className={styles.App}>
      <AppHeader  />
     
         <Switch>
           <Route path="/" exact={true}>
              <DndProvider backend={HTML5Backend}> 
                  <div className={styles.contentWrapper}>               
                      <div className={styles.ingredientsBurger}>
                          {getIngredients(data)}
                      </div>
                      <div className={styles.constructorBurger}><BurgerConstructor /></div>
                      {order && <h1 className={styles.appHeader}>Order Complete!</h1>}
                      </div>
                </DndProvider>
            </Route>
            <Route path='/login' exact={true}>
              <Login/>
            </Route>

            <Route path="/ingredients/:id" exact={true}>
              <IngredientDetails />
            </Route>
            <Route path="/profile" exact={true}>
              <Profile />
            </Route>
            <Route path="/reset-password" exact={true}>
              <ResetPassword />
            </Route>
            <Route path="/forgot-password" exact={true}>
              <ForgotPassword />
            </Route>
            <Route path="/register" exact={true}>
              <Register />
            </Route>
              </Switch>
              </div>
        </Router>
   
  );
}

export default App;
