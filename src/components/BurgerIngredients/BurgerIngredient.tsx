import { Counter,CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredient.module.css';
import {IBareBurgerIngredient,IBurgerIngredient } from '../Interfaces'
// import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/fonts/fonts.css';
// import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
// import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
// export interface IBareBurgerIngredient{
//     _id: string,
//     quantity: number,
//     image: string,
//     price: number,
//     name: string
// }

// export interface IBurgerIngredient extends IBareBurgerIngredient{
//     width: string,
//     clickCallback: (arg: number)=>void
// }

export const BurgerIngredient = (props: IBurgerIngredient)=>{
    return (
        <div style={{width: `${props.relativeWidth}`, position:'relative'}} onClick={props.clickCallback}>
            {/* <h2 className={styles.quantity} >{props.quantity}</h2> */}
            <Counter count={props.quantity} size="default" />
            <img className={styles.image}  src={props.image} />
            <div className = {styles.smallContainer}>
                {/* <h2 style={{marginRight:'20px'}}>{props.price}</h2> */}
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