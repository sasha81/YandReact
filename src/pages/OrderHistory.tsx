import React,{useEffect} from 'react';
import {useDispatch, useSelector} from'services/store';
//import {useDispatch, useSelector} from'react-redux';
import {WS_ALL_CONNECTION_START, WS_ORDER_CONNECTION_START} from 'services/actions/wsActions'
import {RootState} from 'services/store'
import { IWSResponse } from 'components/Interfaces';
import { useHistory, useLocation, useParams } from 'react-router-dom'; 

function OrderHistory() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

const orderArr = useSelector((store)=>store.wsConnection['messagesOrder'] as IWSResponse)   
  
    useEffect(() => {
  
  
  //   dispatch({type:WS_ORDER_CONNECTION_START,payload: window.localStorage.getItem('accessToken')})
     dispatch({type:WS_ORDER_CONNECTION_START,payload: window.localStorage.getItem('accessToken')})
    }, [dispatch])




    return (
        <div>
            <h1>Order History goes here</h1>
            <ul>
            {orderArr?.orders && orderArr.orders.map(order=>{
                return (<li key={order._id} onClick={()=>{
                    history.replace({
                        pathname:`/profile/orders/${order._id}`,
                         state:{background:location, from:location}
                    })   
                }}>{order._id}</li>)
            })}
            </ul>
        </div>
    )
}

export default OrderHistory
