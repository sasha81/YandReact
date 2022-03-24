import { Counter,CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredient.module.css';

const BurgerIngredient = (props: any)=>{
    return (
        <div style={{width: `${props.relativeWidth}`, position:'relative'}} onClick={props.clickCallback}>
            <h2 className={styles.quantity} >{props.quantity}</h2>
            {/* <Counter count={props.quantity} size="default" /> */}
            <img className={styles.image}  src={props.image} />
            <div className = {styles.smallContainer}>
                <h2 style={{marginRight:'20px'}}>{props.price}</h2>
                <CurrencyIcon type="primary" />
            </div>
           
            <h3 className = {styles.name} >{props.name}</h3>

        </div>

    )
}

export default BurgerIngredient;