import React from 'react';
import styles from './ModalOverlay.module.css'

interface IModalOverlay{
    onClose : ()=>void
}

const ModalOverlay =({onClose} : IModalOverlay): React.ReactElement=>{
   

      return (
        <div className={styles.overlay} onClick={onClose} />
      )
}

export default ModalOverlay;