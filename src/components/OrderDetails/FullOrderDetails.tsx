import { IWSResponse } from 'components/Interfaces';
import Modal from 'components/Modal/Modal';
import modalStyles from 'components/Modal/Modal.module.css'
import React,{useEffect} from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom'; 
import { WS_ALL_CONNECTION_START } from 'services/actions/wsActions';
import {useSelector, useDispatch} from 'services/store';


//These props are needed to connect to the WS_ALL if the user manually goes to a feed/id browser url
interface IFullOrderProps{
    criteria:boolean;
    initCallback:Function
}
//{criteria,initCallback}:IFullOrderProps
function FullOrderDetails() {
    const location = useLocation();
    const history = useHistory();

    const {id} = useParams();
    const dispatch = useDispatch();
    const orderArr = useSelector((store)=>store.wsConnection['messagesAll'] as IWSResponse);
    const isSuccess = useSelector((store)=>store.wsConnection['wsAllConnected'] as boolean);
   

    useEffect(()=>{
     
       if(!isSuccess) dispatch({type:WS_ALL_CONNECTION_START });

    },[isSuccess]);

    const modalClose =()=>{
        if(location?.state?.from?.pathname){
                return history.replace({pathname: location.state.from.pathname, state: {from:location} })   
            
        }
        else{
            return history.replace({pathname: '/', state: {from:location} })   
        }
    }
    if(location.state && location.state.background){
        return (
            <Modal onClose={modalClose}>
              <ul>
                  {orderArr.orders.find(order=>order._id===id)?.ingredients.map((ingredient,index)=>{
                      return (<li key={ingredient+index}>{ingredient}</li>)
                  })}
              </ul>
        </Modal>
        )
    }
    else{
        return (
            
             <div className={modalStyles.modal} >
               <ul>
                  {orderArr.orders.find(order=>order._id===id)?.ingredients.map(ingredient=>{
                      return (<li key={ingredient}>{ingredient}</li>)
                  })}
              </ul>
            </div>
           
        )
    }

   
}

export default FullOrderDetails
