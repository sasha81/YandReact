import React,{useEffect} from 'react';
import {useDispatch, useSelector} from'services/store';
//import {useDispatch, useSelector} from'react-redux';
import {WS_ALL_CONNECTION_START, WS_ORDER_CONNECTION_START} from 'services/actions/wsActions'
import {RootState} from 'services/store'
import { IBareBurgerIngredient, IWSResponse } from 'components/Interfaces';
import { useHistory, useLocation, useParams } from 'react-router-dom'; 
import OrderTab from 'components/OrderTab/OrderTab';
import styles from './OrderHistory.module.css'
import { getOrderCost } from 'utils/costFunctions';

function OrderHistory() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

const orderArr = useSelector((store)=>store.wsConnection['messagesOrder'] as IWSResponse)  
const allIngredients =  useSelector((store)=>store.allIngredients as IBareBurgerIngredient[])  
  
    useEffect(() => {  
     dispatch({type:WS_ORDER_CONNECTION_START,payload: window.localStorage.getItem('accessToken')})
    }, [dispatch])




    return (
        <div>
           
            <ul className={styles.orderList}>
            {orderArr?.orders && orderArr.orders.map(order=>{
                return (<li key={order._id} onClick={()=>{
                    history.replace({
                        pathname:`/profile/orders/${order._id}`,
                         state:{background:location, from:location}
                    })   
                }}> <OrderTab ingredients={order.ingredients}
                price={getOrderCost(allIngredients,order.ingredients)}
                date={order.createdAt}
                id={order._id}
                name={order.name}
                status={order.status}

 
                /></li>)
            })}
            </ul>
        </div>
    )
}

export default OrderHistory
