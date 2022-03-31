import React, {useState, useEffect} from 'react';
import styles from './Modal.module.css'

interface IModalOverlay{
    onClose : ()=>void
}

const ModalOverlay =({onClose} : IModalOverlay): React.ReactElement=>{
   

      return (
        <div className={styles.overlay} onClick={onClose} />
      )
}

export default ModalOverlay;