import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './input.module.scss';

const Input = ({ children, ...props }) => (
    <div className={styles.root}>
        <div className={classNames(props.className, styles.input)}>
            {children}
        </div>
    </div>
);

Input.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.any,
};

Input.defaultProps = {
    children: <input />,
    className: null,
};

export default Input;
