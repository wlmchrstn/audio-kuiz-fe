import React from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import styles from './modal.module.scss';
import x from '../../assets/icons/fi_x.svg';

const Modal = ({ children, open, onClose, className }) => {
    if (!open) return null;
    return createPortal(
        <>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={classNames(styles.content, className)}>
                <img
                    className={styles.image}
                    src={x}
                    alt={'fi_x'}
                    onClick={onClose}
                />
                {children}
            </div>
        </>,
        document.getElementById('portal')
    );
};

export default Modal;
