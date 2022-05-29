import React,{useEffect} from 'react';
import {useDispatch} from'services/store';
import {WS_ORDER_CONNECTION_START} from 'services/actions/wsActions'

function OrderHistory() {
    const dispatch = useDispatch();

   
  
    useEffect(() => {
  
    //  dispatch(loadData(URL, setStatus));
     dispatch({type:WS_ORDER_CONNECTION_START,payload: window.localStorage.getItem('accessToken')})
    }, [dispatch])




    return (
        <div>
            <h1>Order History goes here</h1>
        </div>
    )
}

export default OrderHistory
