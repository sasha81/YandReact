import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useLocation, useParams } from 'react-router-dom'; 
import {useSelector, useDispatch} from 'react-redux';
import styles from './IngredientDetails.module.css'
import {IBareBurgerIngredient} from '../Interfaces';
import {RootState} from '../../services/store';
import Modal from '../Modal/Modal';
import modalStyles from '../Modal/Modal.module.css'
//style={{textAlign: 'center', marginBottom:'20px'}}
const IngredientDetails = ()=>{
    const {id} = useParams();
    const location = useLocation();
    const history = useHistory();
    
    const allIngredients = useSelector((state: RootState)=>state.allIngredients);
    const ingredient = (allIngredients as IBareBurgerIngredient[]).find(ingredient=>{return ingredient._id===id}) as IBareBurgerIngredient;

    const modalClose =()=>{
        history.replace({pathname: location.state.prevPath,
            state: {...location.state, showModalIngredientDetails:false}
        
    })
    }

    if(location.state && location.state.showModalIngredientDetails){
        return (
            <Modal onClose={modalClose}>
                <BareIngredientDetails {...ingredient} />
        </Modal>
        )
    }
    else{
        return (
            
             <div className={modalStyles.modal} >
                 <BareIngredientDetails {...ingredient} />
            </div>
           
        )
    }
    
}

const BareIngredientDetails = (props:IBareBurgerIngredient)=>{
    return (
        <>
        <p className="text text_type_main-medium">Детали ингридиента</p>
        <img className={styles.image}  src={props.image} />
  <div className = {styles.smallContainer}>
     
      <p className="text text_type_digits-default">{props.price}</p>
      <div  className="p-4">
           <CurrencyIcon type="primary" />
      </div>
  </div>
 
  <p className={`text text_type_main-default ${styles.nameP}`} >{props.name}</p>
  <div className = {styles.smallSpreadContainer}>

      <div>
          <p className="text text_type_main-small text_color_inactive">Калории, ккал</p>
          <p className="text text_type_main-small text_color_inactive">{props.calories}</p>
      </div>
      <div>
          <p className="text text_type_main-small text_color_inactive">Белки, г</p>
          <p className="text text_type_main-small text_color_inactive">{props.proteins}</p>
      </div>
      <div>
          <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
          <p className="text text_type_main-small text_color_inactive">{props.fat}</p>
      </div>
      <div>
          <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
          <p className="text text_type_main-small text_color_inactive">{props.carbohydrates}</p>
      </div> 
  </div>
  </>
    );
}


export default IngredientDetails;