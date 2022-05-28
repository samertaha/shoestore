import React from 'react';
import styles from './modal.module.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal d-block' : 'modal d-none';

  return (
    <div className={showHideClassName}>
      <div className={styles.modalContainer}>
        {children}
        <button type='button' className='modal-close' onClick={handleClose}>
          close
        </button>
      </div>
    </div>
  );
};

export default Modal;
