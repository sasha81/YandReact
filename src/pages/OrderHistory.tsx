import {useEffect} from 'react';
import {useDispatch, useSelector} from'services/store';

import { WS_ORDER_CONNECTION_START,WS_ORDER_CONNECTION_CLOSED, WS_CONNECTION_START, WS_ORDER_CONNECTION_SUCCESS, WS_ORDER_CONNECTION_ERROR, WS_ORDER_GET_MESSAGE, WS_ORDER_SEND_MESSAGE} from 'services/actions/wsActions'

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
        dispatch({ type: WS_CONNECTION_START,payload:{
            url:`wss://norma.nomoreparties.space/orders?token=${window.localStorage.getItem('accessToken')}`,
            actionNames:{
                wsStart:  WS_ORDER_CONNECTION_START,
                onOpen: WS_ORDER_CONNECTION_SUCCESS,
                onError:  WS_ORDER_CONNECTION_ERROR,
                onMessage:  WS_ORDER_GET_MESSAGE,
                wsClose: WS_ORDER_CONNECTION_CLOSED,
                send: WS_ORDER_SEND_MESSAGE,
                close: WS_ORDER_CONNECTION_CLOSED
            }
        } });

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
