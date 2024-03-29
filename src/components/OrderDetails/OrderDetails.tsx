import styles from './OrderDetails.module.css'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ReactElement,ReactChild } from "react";

interface IOrderDetails {
    total: number, orderNumber: number | null | string, orderStatus: boolean, networkError: boolean
}

const OrderDetails = ({ total, orderNumber, orderStatus, networkError }: IOrderDetails): ReactElement => {
    const getOrderNumber = (orderNumber: number | null | string, orderStatus: boolean, networkError: boolean) => {
        if (networkError) {
            return 'Нет соединения с сетью!';
        }
        else if (!orderStatus) {
            return 'Не можем приготовить Ваш заказ. Продукты закончились...'
        }
        else {
            return `Ваш # заказа: ${orderNumber}`;
        }
    }

    return (
        <div className={styles.flexContainerColumnCenter} data-cy="orderDetailsContainer">
            <div className="mb-6 mt-10"><p className="text text_type_digits-large">Цена: {total}</p></div>

            <div className="mb-6"><p className="text text_type_main-medium">{getOrderNumber(orderNumber, orderStatus, networkError)}</p></div>
            <div className="mt-10 mb-10"><CheckMarkIcon type="primary" /></div>
            <div className="mt-2 mb-2"><p className="text text_type_main-small">{orderStatus && 'Ваш заказ начали готовить'}</p></div>
            <div className="mt-2 mb-2"><p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p></div>
        </div>
    )
}

export default OrderDetails;