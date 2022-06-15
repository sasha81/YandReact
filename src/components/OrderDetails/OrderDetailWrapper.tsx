import {useEffect} from 'react'
import Modal from '../Modal/Modal';
import OrderDetails from './OrderDetails';
import {useSelector, useDispatch} from 'services/store';
import { useHistory, useLocation } from 'react-router-dom';

import {resetOrderDetails,sendOrderDetails} from '../../services/actions/constructorThunks' 
import {parseToNearestObject} from '../../utils/parsingFunctions'



//Parses the location L(i):{pathname:'p(i),state:{from:L(i-1),key:{obj}}'} linked list to get the obj
// const parseToNearestObject =(key:string, object: Object, depth: number, arr:boolean[]=[])=>{
//   if(!(typeof object === 'object')) return undefined;
//   arr.push(true);
//   if(arr.length>depth) return undefined;
//   if(object.hasOwnProperty(key)) return object[key];
//  // if(object.hasOwnProperty('from') && !object['from'].hasOwnProperty('state')) return undefined;//object['from'];
//   const result = parseToNearestObject(key,object['from']['state'], depth,arr);
//   return result;
// }

function OrderDetailWrapper() {

 // const [fetchError, setFetchError] = useState(false);


    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    
   let ingredients;
   let cost
   if(location.state){
    ingredients = parseToNearestObject('ingredients',location.state,100);
     cost = parseToNearestObject('cost',location.state,100);
   }
    useEffect(()=>{
      dispatch(sendOrderDetails(cost,()=>{},ingredients))
    },[cost,ingredients])

    const {storeOrderDetails,noConnection} = useSelector((store)=>({     
      storeOrderDetails:store.orderDetails,    
      noConnection: store.noConnection
    }))    



    const modalClose = () => {
        dispatch(resetOrderDetails()); 
        history.replace({pathname:'/',state:{from:location}})       
      }

    
    return (
    
        <Modal onClose={modalClose} >
        
        {storeOrderDetails && <OrderDetails total={storeOrderDetails['cost']} 
                        orderNumber={storeOrderDetails['orderId']}
                        orderStatus={storeOrderDetails['success']}
                        networkError={Boolean(noConnection)} /> 
    }
      </Modal>
    )
}

export default OrderDetailWrapper
