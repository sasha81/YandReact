import { useEffect } from 'react';
import { useDispatch, useSelector } from 'services/store';

import { WS_ALL_CONNECTION_CLOSED, WS_ALL_CONNECTION_ERROR, WS_ALL_CONNECTION_START, WS_ALL_CONNECTION_SUCCESS, WS_ALL_GET_MESSAGE, WS_ALL_SEND_MESSAGE, WS_CONNECTION_START } from 'services/actions/wsActions';
import { IBareBurgerIngredient, IWSResponse } from 'components/Interfaces';
import { useHistory, useLocation } from 'react-router-dom';


import OrderTab from 'components/OrderTab/OrderTab';
import styles from './Feed.module.css'
import { getOrderCost } from 'utils/costFunctions';
import FeedStatistics from './FeedStatistics';

export default function Feed() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const orderArr = useSelector((store) => store.wsConnection['messagesAll'] as IWSResponse)
    const allIngredients = useSelector((store) => store.allIngredients as IBareBurgerIngredient[])

    useEffect(() => {

        dispatch({ type: WS_CONNECTION_START,payload:{
            url:'wss://norma.nomoreparties.space/orders/all',
            actionNames:{
                wsStart:  WS_ALL_CONNECTION_START,
                onOpen: WS_ALL_CONNECTION_SUCCESS,
                onError:  WS_ALL_CONNECTION_ERROR,
                onMessage:  WS_ALL_GET_MESSAGE,
                wsClose: WS_ALL_CONNECTION_CLOSED,
                send: WS_ALL_SEND_MESSAGE,
                close: WS_ALL_CONNECTION_CLOSED
            }
        } });
        return ()=>{
            dispatch({type:WS_ALL_CONNECTION_CLOSED});
         }
    }, [dispatch])


    return (
        <div className={styles.container}>
            <p className={`text text_type_main-medium ${styles.header}`}>Лента заказов</p>
            <div className={styles.orders}>

                {orderArr && orderArr.orders.map(order => {
                    return (<li key={order._id} onClick={() => {
                        history.replace({
                            pathname: `/feed/${order._id}`,
                            state: { background: location, from: location }
                        })
                    }}>
                        <OrderTab ingredients={order.ingredients}
                            price={getOrderCost(allIngredients, order.ingredients)}
                            date={order.createdAt}
                            id={order.number.toString()}
                            name={order.name}


                        /></li>)
                })}
            </div>
            <div className={styles.data}>
                {orderArr?.orders && <FeedStatistics orders={orderArr.orders} />}
            </div>
        </div>
    )
}
