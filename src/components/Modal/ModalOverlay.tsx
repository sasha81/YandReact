import React, {useState, useEffect} from 'react';
import styles from './Modal.module.css'

interface IModalOverlay{
    onClose : ()=>void
}

const ModalOverlay =({onClose} : IModalOverlay): React.ReactElement=>{
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

      return (
        <div className={styles.overlay} onClick={onClose} onKeyPress={escKeyPress}/>
      )
}

export default ModalOverlay;