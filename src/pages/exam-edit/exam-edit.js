import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames';
import { copyToClipboard } from '../../utils/helper';
import styles from './exam-edit.module.scss';

// Components
import Title from '../../components/title/title';
import Modal from '../../components/modal/modal';
import Notification from '../../components/notification/notification';
import Spinner from '../../components/spinner/spinner';
import Paragraph from '../../components/paragraph/paragraph';
import Button from '../../components/button/button';
import Input from '../../components/input/input';

// Icons
import iconPlus from '../../assets/icons/fi_plus.svg';

// Actions
import { getExamEdit, publishExam } from '../../stores/actions/ActionExam';
import { createQuestion } from '../../stores/actions/ActionQuestion';

const ExamEditPage = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [notification, setNotification] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const { loading, buttonLoading, questionLoading, message, messageStatus, exam, examQuestionList } = useSelector(
        state => state.ReducerExam
    );

    useEffect(() => {
        dispatch(getExamEdit(id, setNotification, navigate));
    }, [refresh]);

    const handleQuestion = async (data) => {
        dispatch(createQuestion(id, data, setIsOpen, setNotification, setRefresh, navigate));
    };

    const QuestionForm = () => {
        return (
            <form className={styles.form} onSubmit={handleSubmit(handleQuestion)}>
                <div className={styles['form-field']}>
                    <Paragraph variant={'body-2'}>{'Pertanyaan'}</Paragraph>
                    <Input>
                        <input type={'text'} placeholder={'Pertanyaan'} {...register('name', { required: true })} />
                    </Input>
                    {errors.name && errors.name.type === 'required' && (
                        <p className={styles.error}>*Required field*</p>
                    )}
                </div>
                <div className={styles['form-field']}>
                    <Paragraph variant={'body-2'}>{'Jawaban'}</Paragraph>
                    <Input>
                        <input type={'text'} placeholder={'Jawaban'} {...register('answer', { required: true })} />
                    </Input>
                    {errors.answer && errors.answer.type === 'required' && (
                        <p className={styles.error}>*Required field*</p>
                    )}
                </div>
                <div className={styles['form-field']}>
                    <Paragraph variant={'body-2'}>{'Skor Maksimal'}</Paragraph>
                    <Input>
                        <input type={'number'} {...register('max_score', { required: true })} />
                    </Input>
                    {errors.max_score && errors.max_score.type === 'required' && (
                        <p className={styles.error}>*Required field*</p>
                    )}
                </div>
                <div className={styles['form-field']}>
                    <Paragraph variant={'body-2'}>{'Waktu Pertanyaan'}</Paragraph>
                    <Input>
                        <input type={'number'} {...register('question_time', { required: true })} />
                    </Input>
                    {errors.question_time && errors.question_time.type === 'required' && (
                        <p className={styles.error}>*Required field*</p>
                    )}
                </div>
                <div className={styles['form-field']}>
                    <Paragraph variant={'body-2'}>{'Waktu Menjawab'}</Paragraph>
                    <Input>
                        <input type={'number'} {...register('answer_time', { required: true })} />
                    </Input>
                    {errors.answer_time && errors.answer_time.type === 'required' && (
                        <p className={styles.error}>*Required field*</p>
                    )}
                </div>
                <Button variant={'primary'} type={'submit'}>
                    {buttonLoading ? (
                        <Spinner variant={'button'} />
                    ) : (
                        'Tambahkan Pertanyaan'
                    )}
                </Button>
            </form>
        )
    }

    const QuestionItem = ({ value }) => {
        return (
            <div className={styles['question-container']}>
                <div className={styles['question-left']}>
                    <Paragraph variant={'body-1'}>
                        {`Pertanyaan: ${value.name}`}
                    </Paragraph>
                    <Paragraph variant={'body-1'}>
                        {`Jawaban: ${value.answer}`}
                    </Paragraph>
                </div>
                <div className={styles['question-right']}>
                    <Paragraph variant={'body-1'}>{`Skor maksimal: ${value.max_score}`}</Paragraph>
                    <Paragraph variant={'body-1'}>{`Waktu pertanyaan: ${value.question_time}`}</Paragraph>
                    <Paragraph variant={'body-1'}>{`Waktu menjawab: ${value.answer_time}`}</Paragraph>
                </div>
            </div>
        )
    };

    const mapQuestion = () => {
        return (
            <>
                <div className={styles['button-add']} onClick={() => setIsOpen(true)}>
                    <img src={iconPlus} alt={'fi_plus'} />
                    <Paragraph variant={'body-2'} color={'neutral'}>
                        {'Tambah Pertanyaan'}
                    </Paragraph>
                </div>
                {examQuestionList.length !== 0 ? (
                    <div className={styles.exams}>
                        {console.log(examQuestionList)}
                        {examQuestionList.map((value, index) => {
                            return (
                                <QuestionItem value={value} key={index} />
                            );
                        })}
                    </div>
                ) : (
                    <div className={styles['empty-question']}>
                        <Paragraph variant={'body-1'} className={styles['empty-exam-label']}>
                            {'Belum ada pertanyaan'}
                        </Paragraph>
                    </div>
                )}
            </>
        );
    };

    const handlePublish = async () => {
        let data = {
            status: 'Published'
        }
        dispatch(publishExam(id, data, setNotification, setRefresh, navigate));
    };

    return (
        <section className={styles.root}>
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className={styles['modal-question']}
            >
                {<QuestionForm />}
            </Modal>
            <Modal
                open={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                className={styles.modal}
            >
                {/* <ExamForm /> */}
            </Modal>
            <Notification
                message={message}
                variant={messageStatus}
                show={notification}
                setShow={setNotification}
            />
            <div className={styles.exam}>
                {loading ? (
                    <Spinner variant={'page'} />
                ) : (
                    <>
                        <div className={styles['exam-left']}>
                            <Title tagElement={'h1'} variant={'heading-1'}>
                                {exam.name}
                            </Title>
                            <Title tagElement={'h2'} variant={'title-1'}>
                                {`Program Studi: ${exam.prodi}`}
                            </Title>
                            <Paragraph variant={'body-1'}>
                                {`Tanggal Ujian: ${moment(exam.examDate).format('LLLL')}`}
                            </Paragraph>
                            <Paragraph variant={'body-1'}>
                                {`Dosen Pengampu: ${exam.teacher}`}
                            </Paragraph>
                        </div>
                        <div className={styles['exam-right']}>
                            <div className={classNames(styles.status, styles[exam.status])}>
                                <Paragraph variant={'body-1'}>
                                    {exam.status}
                                </Paragraph>
                            </div>
                            <div className={styles['button-group']}>
                                <Button variant={'primary'} type={'button'} className={styles.publish} onClick={() => handlePublish()}>
                                    {'Publish ujian'}
                                </Button>
                                <Button variant={'secondary'} type={'button'} className={styles['exam-code']} onClick={() => copyToClipboard(exam.examCode)}>
                                    {exam.examCode}
                                </Button>
                                <Button variant={'primary'} type={'button'}>
                                    {'Edit'}
                                </Button>
                                <Button variant={'danger'} type={'button'}>
                                    {'Delete'}
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className={styles.questions}>
                {!loading && !questionLoading ? (
                    <>
                        <Title tagElement={'h2'} weight={'bold'} variant={'heading-2'}>
                            {'Daftar pertanyaan'}
                        </Title>
                        {mapQuestion()}
                    </>
                ) : (
                    <Spinner variant={'page'} />
                )}
            </div>
        </section>
    );
};

export default ExamEditPage;
