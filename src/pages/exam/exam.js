import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from './exam.module.scss';

const ExamPage = () => {
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: false });
    const [recordStatus, setRecordStatus] = useState("");
    const [step, setStep] = useState("identitas");
    const [exam, setExam] = useState({
        name: "",
        question: ""
    });
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getExam = async () => {
            const { data: response } = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/exam/show/${id}`
            );
            setExam(response.result);
        }
        getExam();
    }, [setExam, id]);

    const handleForm = async (data) => {
        try {
            const reader = new FileReader();
        
            fetch(mediaBlobUrl)
                .then((res) => res.blob())
                .then((blob) => {
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        let req = {
                            ...data,
                            exam: id,
                            answer: reader.result?.toString()
                        };
                        axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/create`, req)
                            .then((response) => {
                                console.log(response);
                                alert('berhasil');
                                navigate('/user');
                            })
                    };
                });
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.root}>
            <form className={styles['exam-wrapper']} onSubmit={handleSubmit(handleForm)}>
                {step === "ujian" ? (
                    <>
                        <h1 className={styles.title}>{exam?.name}</h1>
                        <p className={styles.question}>{`Pertanyaan: ${exam?.question}`}</p>
                        <div>{`Status recording: ${status}`}</div>
                        <div className={styles["button-group"]}>
                            <button type={'button'} onClick={() => {
                            startRecording();
                            setRecordStatus("start");
                            }}>Start Recording</button>
                            <button type={'button'} onClick={() => {
                            stopRecording();
                            setRecordStatus("stop");
                            }}>Stop Recording</button>
                            <button type={'submit'}>Submit Jawaban</button>
                        </div>
                        <div className={styles["media-wrapper"]}>
                            {recordStatus === "stop" ? <audio src={mediaBlobUrl} controls /> : null}
                        </div>
                    </>
                ) : step === "identitas" ? (
                    <>
                        <h1 className={styles.title}>{'Masukkan Data Diri'}</h1>
                        <div className={styles['form-field']}>
                            <div className={styles.input}>
                                <input type={'text'} placeholder={'Nama'} {...register('name', { required: true })} />
                            </div>
                            {errors.name && errors.name.type === 'required' && (
                                <p className={styles.error}>*Required field*</p>
                            )}
                        </div>
                        <div className={styles['form-field']}>
                            <div className={styles.input}>
                                <input type={'text'} placeholder={'Nim'} {...register('nim', { required: true })} />
                            </div>
                            {errors.nim && errors.nim.type === 'required' && (
                                <p className={styles.error}>*Required field*</p>
                            )}
                        </div>
                        <div className={styles['form-field']}>
                            <div className={styles.input}>
                                <input type={'text'} placeholder={'Prodi'} {...register('prodi', { required: true })} />
                            </div>
                            {errors.prodi && errors.prodi.type === 'required' && (
                                <p className={styles.error}>*Required field*</p>
                            )}
                        </div>
                        <button className={styles.button} type={'button'} onClick={() => setStep("ujian")}>Ke Soal</button>
                    </>
                ) : null}
            </form>
        </div>
    );
}

export default ExamPage;
