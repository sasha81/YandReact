import { IBareBurgerIngredient, IWSResponse } from 'components/Interfaces';
import Modal from 'components/Modal/Modal';
import modalStyles from 'components/Modal/Modal.module.css'
import React,{useEffect} from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom'; 
import { WS_ALL_CONNECTION_START } from 'services/actions/wsActions';
import {useSelector, useDispatch} from 'services/store';
import {IOrderTab} from 'components/Interfaces';
import styles from './FullOrderDetails.module.css';


// interface IOrderTab{
//     ingredients:string[];
//     name:string;
//     price:number;
//     date:string;
//     id:string;
// }



type TIngredientData={
    pictureName: string;
    pictureSrc: string;
    price: number;
}


function FullOrderDetails() {
    const location = useLocation();
    const history = useHistory();

    const {id} = useParams();
    const dispatch = useDispatch();
    const orderArr = useSelector((store)=>store.wsConnection['messagesAll'] as IWSResponse);
    const isSuccess = useSelector((store)=>store.wsConnection['wsAllConnected'] as boolean);
    const allIngredients = useSelector((store)=>store.allIngredients as IBareBurgerIngredient[]);
    const order = orderArr?.orders.find(order=>order._id===id) ;
const ingredients = order?.ingredients;
const ingredientPictures = allIngredients.reduce((accumArr,ingredient)=>{
    if(ingredients?.includes(ingredient._id)){ accumArr=accumArr.concat(ingredient.image);}
    return accumArr;
},[] as string[]);

const price = ingredients?.map(ingredient=>{return allIngredients.find(i=>i._id===ingredient)?.price}).reduce<number>((acc,price)=>{
  if(price) acc= acc+price;
  return acc;
},0)

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
               <GetDetails
             ingredientPictures={ingredientPictures}
             price={price}
             date={order?.createdAt}
             id={order?._id}
             status={order?.status}
             name={'Abcde'}
            
             />
        </Modal>
        )
    }
    else{
        return (
            
             <div className={modalStyles.modal} >
             <GetDetails
             ingredientPictures={ingredientPictures}
             price={price}
             date={order?.createdAt}
             id={order?._id}
             status={order?.status}
             name={'Abcde'}
            
             />
            </div>
           
        )
    }

   
}

 export const GetDetails=({ingredientPictures,name,price,date,id,status}:Omit<IOrderTab,'ingredients'> & {status:string | undefined}&{ingredientPictures:string[]})=>{
    
    return (
        <div>
             <p className="text text_type_digits-default">#{id}</p>
             <p className="text text_type_digits-default">{status}</p>
             <div>
                {ingredientPictures.map((picture,index)=>{
                    return (   <img key={index} className={styles.image} src={picture} />)
                })}
            </div>
            <p className="text text_type_digits-default">{date}</p>
            <p className="text text_type_digits-default">{price}</p>

        </div>
    )
}

export default FullOrderDetails
