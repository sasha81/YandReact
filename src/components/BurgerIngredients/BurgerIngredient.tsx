import { Counter,CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredient.module.css';
import {IBurgerIngredient } from '../Interfaces'

export const BurgerIngredient = (props: IBurgerIngredient)=>{
    return (
        <div style={{width: `${props.relativeWidth}`, position:'relative'}} onClick={props.clickCallback}>
            
            <Counter count={props.quantity} size="default" />
            <img className={styles.image}  src={props.image} />
            <div className = {styles.smallContainer}>
              
                <p className="text text_type_digits-default">{props.price}</p>
                <div  className="p-4">
                     <CurrencyIcon type="primary" />
                </div>
            </div>
           
            <p className="text text_type_main-default" style={{textAlign: 'center'}}>{props.name}</p>

        </div>

    )
}

//export default BurgerIngredient;