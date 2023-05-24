import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useReactMediaRecorder } from 'react-media-recorder-2';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import styles from './student-exam.module.scss';

// Components
import Button from '../../components/button/button';
import Title from '../../components/title/title';
import Paragraph from '../../components/paragraph/paragraph';
import Spinner from '../../components/spinner/spinner';

const StudentExamPage = () => {
    const [step, setStep] = useState('initial')
    const navigate =  useNavigate();
    const dispatch = useDispatch();
    const [tempAnswer, setTempAnswer] = useState([]);
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: false });
    const [recordStatus, setRecordStatus] = useState("");
    const { buttonLoading, studentExam, studentExamAnswer } = useSelector(
        state => state.ReducerStudent
    );
    const [nomor, setNomor] = useState(0);
    const [countDown, setCountDown] = useState(0);
    const [answerCountDown, setAnswerCountDown] = useState(0);

    useEffect(() => {
        if (studentExam.name == '') {
            navigate('/')
        }
    }, []);

    useEffect(() => {
        if (step == 'finish') {
            // dispatch(submitStudentExam())
        }
    }, []);

    useEffect(() => {
        if (countDown != 0 && step == 'start') {
            const interval = setInterval(() => {
              setCountDown(countDown-1);
            }, 1000);

            return () => clearInterval(interval);
        } else if (countDown == 0 && answerCountDown != 0 && step == 'start') {
            let interval = setInterval(() => {
                setAnswerCountDown(answerCountDown-1);
            }, 1000);

            return () => clearInterval(interval);
        } else if (countDown == 0 && answerCountDown == 0 && step == 'start' && (nomor+1) == studentExam.questions.length) {
            setStep('finish');
        } else if (countDown == 0 && answerCountDown == 0 && step == 'start' && (nomor+1) != studentExam.questions.length) {
            setCountDown(studentExam.questions[nomor].question_time || 0);
            setAnswerCountDown(studentExam.questions[nomor].answer_time || 0);
            setNomor(nomor+1);
        }
    }, [countDown, answerCountDown]);

    useEffect(() => {
        if (countDown == 0 && answerCountDown == studentExam.questions[nomor].answer_time && step == 'start') {
            startRecording();
            setRecordStatus(status);
        } else if (countDown == 0 & answerCountDown == 0) {
            stopRecording();
            setRecordStatus(status);
            setTempAnswer(prev => [...prev, mediaBlobUrl]);
            console.log(tempAnswer);
            console.log(tempAnswer);
        }
    }, [step, nomor, countDown, answerCountDown]);

    const mulaiUjian = () => {
        setStep('start');
        setCountDown(studentExam.questions[nomor].question_time);
        setAnswerCountDown(studentExam.questions[nomor].answer_time);
    };

    const mapUjian = () => {
        return (
            <div>
                <Title variant={'heading-1'} tagElement={'h1'}>
                    {`Pertanyaan No. ${nomor+1}`}
                </Title>
                <Paragraph variant={'body-1'}>{studentExam.questions[nomor].name}</Paragraph>
                {countDown != 0 ? (
                    <Paragraph variant={'body-1'}>{`Rekaman akan dimulai dalam: ${countDown}`}</Paragraph>
                ) : (
                    <>
                        <Paragraph variant={'body-1'}>{`Waktu menjawab akan selesai dalam: ${answerCountDown}`}</Paragraph>
                        <Paragraph variant={'body-1'}>{recordStatus}</Paragraph>
                    </>
                )}
            </div>
        );
    };

    const mapFinishUjian = () => {
        return (
            <div>
                <Title tagElement={'h1'} variant={'heading-1'}>
                    {'Ujian telah selesai, jawabanmu sedang disimpan'}
                </Title>
                <Paragraph variant={'body-1'}>
                    {tempAnswer.toString()}
                </Paragraph>
                <Button variant={'primary'} type={'button'} onClick={() => navigate('/student')}>
                    {buttonLoading ? (
                        <Spinner variant={'button'} />
                    ) : (
                        'Kembali ke halaman murid'
                    )}
                </Button>
            </div>
        );
    };

    // const handleForm = async (data) => {
    //     try {
    //         const reader = new FileReader();

    //         fetch(mediaBlobUrl)
    //             .then((res) => res.blob())
    //             .then((blob) => {
    //                 reader.readAsDataURL(blob);
    //                 reader.onloadend = () => {
    //                     let req = {
    //                         ...data,
    //                         exam: id,
    //                         answer: reader.result?.toString()
    //                     };
    //                     axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/create`, req)
    //                         .then((response) => {
    //                             console.log(response);
    //                             alert('berhasil');
    //                             navigate('/user');
    //                         })
    //                 };
    //             });
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }

    return (
        <section className={styles.root}>
            {step == 'initial' ? (
                <div className={styles['exam-info']}>
                    <Title variant={'heading-1'}>{studentExam.name}</Title>
                    <Paragraph variant={'body-1'}>{`Program studi: ${studentExam.prodi}`}</Paragraph>
                    <Paragraph variant={'body-1'}>{`Tanggal Ujian: ${moment(studentExam.exam_date).format('LLLL')}`}</Paragraph>
                    <Paragraph variant={'body-1'}>{`Kode Ujian: ${studentExam.exam_code}`}</Paragraph>
                    <Paragraph variant={'body-1'}>{`Dosen Pengampu: ${studentExam.teacher.name}`}</Paragraph>
                    <div className={styles['button-wrapper']}>
                        <Button variant={'primary'} type={'button'} onClick={() => mulaiUjian()}>{'Mulai Ujian'}</Button>
                    </div>
                </div>
            ) : step == 'start' ? (
                mapUjian()
            ) : mapFinishUjian()}
        </section>
    )
};

export default StudentExamPage;
