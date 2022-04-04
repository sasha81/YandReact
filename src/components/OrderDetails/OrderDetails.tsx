import styles from './OrderDetails.module.css'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const OrderDetails = ({total, orderNumber, orderStatus}:{total:number, orderNumber: number | string |null, orderStatus: boolean})=>{
    return(
        <div className={styles.flexContainerColumnCenter} >
        <div className="mb-6 mt-10"><p className="text text_type_digits-large">{total}</p></div>
        
    <div className="mb-6"><p className="text text_type_main-medium">{orderNumber ? `Ваш # заказа: ${orderNumber}` : 'Не удалось обработать заказ...'}</p></div>
        <div className="mt-10 mb-10"><CheckMarkIcon type="primary" /></div>
        <div className="mt-2 mb-2"><p className="text text_type_main-small">{orderStatus ? 'Ваш заказ начали готовить' : 'Уппс! Что то пошло не так. Зайдите позже'}</p></div>
        <div className="mt-2 mb-2"><p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p></div>
    </div>
    )
}

export default OrderDetails;