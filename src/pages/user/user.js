import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './user.module.scss';

const UserPage = () => {
    const [userData, setUserData] = useState([{
        name: "",
        nim: "",
        prodi: "",
        exam: {
            name: "",
            question: ""
        },
        answer: ""
    }]);

    useEffect(() => {
        const getUser = async () => {
            const { data: response } = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/user/show`
            );
            setUserData(response.result);
        }
        getUser();
    }, []);

    const handleMap = (params) => {
        if (params.length !== 0) {
            return params.map((value, index) => {
                console.log('exam', value.exam);
                return (
                    <div className={styles.card} key={index}>
                        <div className={styles.content}>
                            <div>
                                {`Nama Mahasiswa: ${value?.name}`}
                            </div>
                            <div>
                                {`Nim Mahasiswa: ${value.nim}`}
                            </div>
                            <div>
                                {`Prodi: ${value.prodi}`}
                            </div>
                            <div>
                                {`Nama Ujian: ${value.exam.name}`}
                            </div>
                            <div>
                                {`Pertanyaan: ${value.exam.question}`}
                            </div>
                            <div>
                                {`Jawaban:`}
                            </div>
                            <audio src={value.answer} controls />
                        </div>
                    </div>
                );
            });
        } else {
            return (
                <div>
                    <h2>Tidak ada Jawaban</h2>
                </div>
            )
        }
    };

    return (
        <section className={styles.root}>
            <div className={styles.header}>
                <h1 className={styles.heading}>List Jawaban</h1>
                <Link to={'/admin'}>Kembali ke admin</Link>
            </div>
            <div className={styles.user}>{handleMap(userData)}</div>
        </section>
    )
};

export default UserPage;
