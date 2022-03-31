import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './IngredientDetails.module.css'
import {IBareBurgerIngredient} from '../Interfaces';

const IngredientDetails = (props:IBareBurgerIngredient)=>{
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
 
  <p className="text text_type_main-default" style={{textAlign: 'center', marginBottom:'20px'}}>{props.name}</p>
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
    )
}

export default IngredientDetails;