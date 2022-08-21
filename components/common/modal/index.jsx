import { memo, useEffect, useState } from 'react'
import ReactDOM from "react-dom";

import classes from './modal.module.css'

const Modal = memo(({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <button className={classes['close-btn']} onClick={handleCloseClick}>
            x
          </button>
        </div>
        {title && <h1>{title}</h1>}
        <div className={classes.body}>
          {children}
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
})

Modal.displayName = 'Modal'
export default Modal