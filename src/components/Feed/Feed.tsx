import React,{useEffect} from 'react';
//import {useDispatch, useSelector} from'services/store';
import {useDispatch, useSelector} from'react-redux';
import {WS_ALL_CONNECTION_START} from 'services/actions/wsActions';
import {IBareBurgerIngredient, IWSResponse} from 'components/Interfaces';
import { useHistory, useLocation, useParams } from 'react-router-dom'; 
import {RootState} from 'services/store'
import FullOrderDetails from 'components/OrderDetails/FullOrderDetails';
import OrderTab from 'components/OrderTab/OrderTab';
import styles from './Feed.module.css'
import { getOrderCost } from 'utils/costFunctions';

export default function Feed() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const orderArr = useSelector((store:RootState)=>store.wsConnection['messagesAll'] as IWSResponse )  
    const allIngredients =  useSelector((store:RootState)=>store.allIngredients as IBareBurgerIngredient[] )  
      
        useEffect(() => {
      
        //  dispatch(loadData(URL, setStatus));
         dispatch({type:WS_ALL_CONNECTION_START})
        }, [dispatch])
    
    


    return (
        <div className={styles.container}>
            <div className={styles.orders}>
            <p className={`text text_type_main-medium`}>Лента заказов</p>
            {orderArr && orderArr.orders.map(order=>{
                return (<li key={order._id} onClick={()=>{
                    history.replace({
                        pathname:`/feed/${order._id}`,
                         state:{background:location, from:location}
                    })   
                }}>
                    <OrderTab ingredients={order.ingredients}
                               price={getOrderCost(allIngredients,order.ingredients)}
                               date={order.createdAt}
                               id={order._id}
                               name={order.name}

                
                /></li>)
            })}
            </div>
            <div className={styles.data}>
                {orderArr &&orderArr?.total && orderArr.total}
            </div>
        </div>
    )
}
