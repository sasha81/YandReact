import React, {useState} from 'react';
import Modal from '../Modal/Modal';
import styles from './OrderDetails.module.css'
import { Counter,CurrencyIcon,CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IOrderDetails {
    total:number,
    onClose: ()=>void
}

const OrderDetail = (props:IOrderDetails)=>{

    return (<Modal  onClose={props.onClose}>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <div className="mb-6 mt-10"><p className="text text_type_digits-large">{props.total}</p></div>
                    
                    <div className="mb-6"><p className="text text_type_main-medium">Идентификатор заказа</p></div>
                    <div className="mt-10 mb-10"><CheckMarkIcon type="primary" /></div>
                    <div className="mt-2 mb-2"><p className="text text_type_main-small">Ваш заказ начали готовить</p></div>
                    <div className="mt-2 mb-2"><p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p></div>
                </div>
              

            </Modal>)

}


export default  OrderDetail;