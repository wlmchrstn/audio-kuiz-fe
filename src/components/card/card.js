import React from 'react';
import styles from './card.module.scss';

const Card = ({ data, ...props }) => {
    const { name, questions } = data;
    const mapQuestion = (params) => {
        return params?.map((value, index) => {
            return (
                <p className={styles.pbody} key={index}>
                    {value.text}
                </p>
            );
        })
    };

    return (
        <div className={styles.root} {...props}>
            <div className={styles.heading}>
                {name}
            </div>
            <div className={styles['list-heading']}>
                {'Question List'}
            </div>
            <div className={styles.list}>
                {mapQuestion(questions)}  
            </div>
        </div>
    )
};

export default Card;
