import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './notification.module.scss';

import Paragraph from '../paragraph/paragraph';

const Notification = ({ message, variant, show, setShow }) => {
    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShow(false);
        }, 3000);

        return () => {
            clearTimeout(timeId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    if (!show) return null;
    return createPortal(
        <div className={classNames(styles.root, styles[variant])}>
            <Paragraph variant={'body-1'} color={'white'}>
                {message}
            </Paragraph>
        </div>,
        document.getElementById('portal')
    );
};

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
    show: PropTypes.bool,
    setShow: PropTypes.func,
};

Notification.defaultProps = {
    message: 'Notification message',
    variant: 'success',
    show: false,
    setShow: null,
};

export default Notification;
