import React from 'react';
import { ClipLoader, PulseLoader } from 'react-spinners';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './spinner.module.scss';

const override = {
    borderColor: '#e2d4f0',
    display: 'block',
    margin: 'auto',
};

const Spinner = ({ variant }) => {
    return (
        <div className={classNames(styles.root, styles[variant])}>
            {variant === 'page' ? (
                <ClipLoader
                    color={'#e2d4f0'}
                    loading={true}
                    css={override}
                    size={50}
                />
            ) : (
                <PulseLoader
                    color={'#e2d4f0'}
                    loading={true}
                    css={override}
                    size={20}
                />
            )}
        </div>
    );
};

Spinner.propTypes = {
    variant: PropTypes.string.isRequired,
};

Spinner.defaultProps = {
    variant: 'page',
};

export default Spinner;
