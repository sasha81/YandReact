import React,{useEffect} from 'react';
import {useDispatch, useSelector} from'services/store';
//import {useDispatch, useSelector} from'react-redux';
import {WS_ORDER_CONNECTION_START} from 'services/actions/wsActions'
import {RootState} from 'services/store'
import { IWSResponse } from 'components/Interfaces';

function OrderHistory() {
    const dispatch = useDispatch();

const orderArr = useSelector((store)=>store.wsConnection['messagesOrder'] as IWSResponse)   
  
    useEffect(() => {
  
    //  dispatch(loadData(URL, setStatus));
     dispatch({type:WS_ORDER_CONNECTION_START,payload: window.localStorage.getItem('accessToken')})
    }, [dispatch])




    return (
        <div>
            <h1>Order History goes here</h1>
    {orderArr&& <p>{orderArr}</p>}
        </div>
    )
}

export default OrderHistory
