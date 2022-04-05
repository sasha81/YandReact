import React, { useEffect, ReactChild, useCallback } from 'react';
import ReactDOM from 'react-dom'
import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';



const modalRoot = document.getElementById("portal") as HTMLElement;
interface IModalProps {
  onClose: () => void,
  children: ReactChild[] | ReactChild
}

const Modal = ({ onClose, children }: IModalProps): React.ReactElement => {

  const escKeyPress = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    window.addEventListener('keydown', escKeyPress);

    return () => {
      window.removeEventListener('keydown', escKeyPress);
    };
  }, [escKeyPress, onClose]);


  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />

      <div className={styles.modal} onKeyPress={escKeyPress}>
        <div className={styles.closeIconWrapper} ><CloseIcon type="primary" onClick={onClose} /></div>

        {children}
      </div>
    </>

    , modalRoot)

}

export default Modal;