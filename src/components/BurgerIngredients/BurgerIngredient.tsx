import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredient.module.css';
import { IBurgerIngredient } from '../Interfaces'
//style={{width: `${props.relativeWidth}`, position:'relative'}}
export const BurgerIngredient = (props: IBurgerIngredient) => {
    return (
        <div className={styles[props.relativeWidth]} onClick={props.clickCallback}>
            <p className={`text text_type_main-default ${styles.info}`} onClick={props.infoCallback}>Info</p>
            <Counter count={props.quantity} size="default" />
            <img className={styles.image} src={props.image} />
            <div className={styles.smallContainer}>

                <p className="text text_type_digits-default">{props.price}</p>
                <div className="p-4">
                    <CurrencyIcon type="primary" />
                </div>
            </div>

            <p className={`text text_type_main-default ${styles.center}`} >{props.name}</p>

        </div>

    )
}

//export default BurgerIngredient;