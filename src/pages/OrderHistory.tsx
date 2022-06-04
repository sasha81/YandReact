import {useEffect} from 'react';
import {useDispatch, useSelector} from'services/store';

import { WS_ORDER_CONNECTION_START,WS_ORDER_CONNECTION_CLOSED} from 'services/actions/wsActions'

import { IBareBurgerIngredient, IWSResponse } from 'components/Interfaces';
import { useHistory, useLocation } from 'react-router-dom'; 
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
     dispatch({type:WS_ORDER_CONNECTION_START,payload: window.localStorage.getItem('accessToken')});

     return ()=>{
        dispatch({type:WS_ORDER_CONNECTION_CLOSED});
     }
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
                id={order.number.toString()}
                name={order.name}
                status={order.status}

 
                /></li>)
            })}
            </ul>
        </div>
    )
}

export default OrderHistory
