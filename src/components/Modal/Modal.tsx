import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'

const modalRoot = document.getElementById("portal") as HTMLElement;
const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000
  }
  
  const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
  }

const Modal =({ onClose, children}) =>{
    //if(!open) return null;

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
                 <div className={styles.overlay} onClick={onClose} onKeyPress={escKeyPress}/>
                    <div className={styles.modal}>
                        <button onClick={onClose}>Close Modal</button>
                        {children}
                    </div>
            </>

    ,modalRoot )

}

export default Modal;