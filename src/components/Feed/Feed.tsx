import React,{useEffect} from 'react';
//import {useDispatch, useSelector} from'services/store';
import {useDispatch, useSelector} from'react-redux';
import {WS_ALL_CONNECTION_START} from 'services/actions/wsActions';
import {IWSResponse} from 'components/Interfaces';
import { useHistory, useLocation, useParams } from 'react-router-dom'; 
import {RootState} from 'services/store'

export default function Feed() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const orderArr = useSelector((store:RootState)=>store.wsConnection['messagesAll'] as IWSResponse )   
      
        useEffect(() => {
      
        //  dispatch(loadData(URL, setStatus));
         dispatch({type:WS_ALL_CONNECTION_START})
        }, [dispatch])
    
    


    return (
        <div>
            <ul>
            {orderArr && orderArr.orders.map(order=>{
                return (<li key={order._id} onClick={()=>{
                    history.replace({
                        pathname:`/feed/${order._id}`,
                         state:{background:location, from:location}
                    })   
                }}>{order._id}</li>)
            })}
            </ul>
        </div>
    )
}
