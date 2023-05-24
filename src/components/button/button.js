import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './button.module.scss';

const Button = ({ children, variant, type, className, disabled, ...props }) => {
    return (
        <button
            className={classNames(styles.root, styles[variant], className)}
            type={type}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    children: '',
    variant: 'primary',
    type: 'button',
    className: null,
    disabled: false,
};

export default Button;
