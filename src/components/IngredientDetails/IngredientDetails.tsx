import {IBareBurgerIngredient} from '../Interfaces';
import Modal from '../Modal/Modal';
import styles from './IngredientDetails.module.css'
import { Counter,CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


interface IIngredientDetails {
    onClose: ()=>void,
    data: IBareBurgerIngredient
}


const IngredientDetails = (props:IIngredientDetails) =>{
    
    return (
        <Modal  onClose={props.onClose}>
             <p className="text text_type_main-medium">Детали ингридиента</p>
              <img className={styles.image}  src={props.data.image} />
        <div className = {styles.smallContainer}>
           
            <p className="text text_type_digits-default">{props.data.price}</p>
            <div  className="p-4">
                 <CurrencyIcon type="primary" />
            </div>
        </div>
       
        <p className="text text_type_main-default" style={{textAlign: 'center', marginBottom:'20px'}}>{props.data.name}</p>
        <div className = {styles.smallSpreadContainer}>

            <div>
                <p className="text text_type_main-small text_color_inactive">Калории, ккал</p>
                <p className="text text_type_main-small text_color_inactive">{props.data.calories}</p>
            </div>
            <div>
                <p className="text text_type_main-small text_color_inactive">Белки, г</p>
                <p className="text text_type_main-small text_color_inactive">{props.data.proteins}</p>
            </div>
            <div>
                <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
                <p className="text text_type_main-small text_color_inactive">{props.data.fat}</p>
            </div>
            <div>
                <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
                <p className="text text_type_main-small text_color_inactive">{props.data.carbohydrates}</p>
            </div>
        </div>

      </Modal>
    )
   
}

export default IngredientDetails;