import { useState, useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useSelector, useDispatch } from 'services/store';

import { Switch, Route } from 'react-router-dom';

import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader'

import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor'

import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients'

import { IBareBurgerIngredient } from '../Interfaces';
import {
  useLocation,

} from "react-router-dom";
import { burgerUrl } from 'configs/urls';

import { loadData } from 'services/actions/constructorThunks'
import IngredientDetails from 'components/IngredientDetails/IngredientDetails';
import Feed from 'components/Feed/Feed'
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import ResetPassword from 'pages/ResetPassword';
import ForgotPassword from 'pages/ForgotPassword';
import Register from 'pages/Register';

import { ProtectedRoute } from 'components/ProtectedRoute/ProtectedRoute'
import { AuthorizedBlockedRoute } from 'components/ProtectedRoute/AuthorizedBlockedRoute'
import OrderDetailWrapper from 'components/OrderDetails/OrderDetailWrapper';
import { loginUserFromToken } from 'services/actions/securityThunk';

import FullOrderDetails from 'components/OrderDetails/FullOrderDetails';

import PersonalOrderDetails from 'components/OrderDetails/PersonalOrderDetails';

interface IAppDataAndStatus {
  error: boolean,
  loading: boolean
}


const URL = burgerUrl + '/ingredients';

const App = (): JSX.Element => {

  const [order] = useState(false);
  const [, setStatus] = useState<IAppDataAndStatus>({ error: false, loading: false })
  const data = useSelector((state) => state.allIngredients);
  const isWSConnected = useSelector(state => state.wsConnection.wsAllConnected)

  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {

    dispatch(loadData(URL, setStatus));
    dispatch(loginUserFromToken(window.localStorage.getItem('accessToken')))
  }, [dispatch])



  const getIngredients = (data: IBareBurgerIngredient[] | null | string) => {
    if (data == null) return (<h1>Loading...</h1>);
    if (typeof data === 'string' || data instanceof String) return (<h1>Can't load data... Please come later.</h1>)

    return (
      <BurgerIngredients />
    );
  }


  let background = location.state && location.state.background;

  return (


    <div className={styles.App}>
      <AppHeader />

      <Switch location={background || location}>

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
        <AuthorizedBlockedRoute path='/login' exact={true}>
          <Login />
        </AuthorizedBlockedRoute>

        <Route path="/ingredients/:id" exact={true}>
          <IngredientDetails />
        </Route>
        <ProtectedRoute path="/profile/orders/:id" exact={true} children={<PersonalOrderDetails />} />
        <ProtectedRoute path="/profile" >
          <Profile />
        </ProtectedRoute>

        

        <AuthorizedBlockedRoute path="/reset-password" exact={true}>
          <ResetPassword />
        </AuthorizedBlockedRoute>
        <AuthorizedBlockedRoute path="/forgot-password" exact={true}>
          <ForgotPassword />
        </AuthorizedBlockedRoute>
        <Route path="/register" exact={true}>
          <Register />
        </Route>

        <Route path="/feed" exact={true}>
          <Feed />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <FullOrderDetails />
        </Route>
       

        <ProtectedRoute path="/orderDetails" children={<OrderDetailWrapper />} />

      </Switch>
      {background && <Route path="/feed/:id" children={<FullOrderDetails />} />}
      {background && <ProtectedRoute path="/profile/orders/:id" children={<PersonalOrderDetails />} />}
      {background && <Route path="/ingredients/:id" children={<IngredientDetails />} />}


    </div>


  );
}

export default App;
