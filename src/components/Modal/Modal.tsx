import React, {useState, useEffect,ReactChildren, ReactChild} from 'react';
import ReactDOM from 'react-dom'
import styles from './Modal.module.css';
import ModalOverlay from './ModalOverlay';
import { Tab,CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';



const modalRoot = document.getElementById("portal") as HTMLElement;
interface IModalProps {
    onClose: ()=>void,
    children:  ReactChild[] |ReactChild
}

const Modal =({ onClose, children}:IModalProps) : React.ReactElement=>{

    const escKeyPress =(event)=>{
        if(event.key === 'Escape'){
            onClose()
          }
    }

    useEffect(() => {
        window.addEventListener('keydown', escKeyPress);
    
        return () => {
          window.removeEventListener('keydown', escKeyPress);
        };
      }, []);
    return ReactDOM.createPortal(
            <>
                    <ModalOverlay onClose={onClose}/>
                
                    <div className={styles.modal} onKeyPress={escKeyPress}>
                        <div style={{position:'absolute', top:50, right:40}}><CloseIcon type="primary" onClick={onClose}/></div>
                        
                        {children}
                    </div>
            </>

    ,modalRoot )

}

export default Modal;