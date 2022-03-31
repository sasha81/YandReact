import styles from './OrderDetails.module.css'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const OrderDetails = ({total, orderNumber}:{total:number, orderNumber: number | string |null})=>{
    return(
        <div className={styles.flexContainerColumnCenter} >
        <div className="mb-6 mt-10"><p className="text text_type_digits-large">{total}</p></div>
        
    <div className="mb-6"><p className="text text_type_main-medium">{orderNumber ? orderNumber : 'Идентификатор заказа'}</p></div>
        <div className="mt-10 mb-10"><CheckMarkIcon type="primary" /></div>
        <div className="mt-2 mb-2"><p className="text text_type_main-small">Ваш заказ начали готовить</p></div>
        <div className="mt-2 mb-2"><p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p></div>
    </div>
    )
}

export default OrderDetails;