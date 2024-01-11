import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './verify-account.module.scss';

// Components
import Notification from '../../components/notification/notification';
import Button from '../../components/button/button';
import Title from '../../components/title/title';
import Paragraph from '../../components/paragraph/paragraph';

// Actions
import { checkVerification, sendVerificationRequest } from '../../stores/actions/ActionAuth';
import Spinner from '../../components/spinner/spinner';


const VerifyAccountPage = () => {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.ReducerAuth);
  const navigate = useNavigate();
  const { id } = useParams();
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    if (sessionStorage.role === 'Teacher') {
      dispatch(checkVerification(id, 'teacher'));
    } else if (sessionStorage.role === 'Student') {
      dispatch(checkVerification(id, 'student'));
    } else {
      navigate('/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerify = () => {
    if (sessionStorage.role === 'Teacher') {
      dispatch(sendVerificationRequest(id, 'teacher', setNotification));
    } else if (sessionStorage.role === 'Student') {
      dispatch(sendVerificationRequest(id, 'student', setNotification))
    }
  };

  return (
    <section className={styles.root}>
      <Notification
        message={AuthReducer?.message}
        variant={AuthReducer?.messageStatus}
        show={notification}
        setShow={setNotification}
      />
      <div className={styles.content}>
        {(sessionStorage.verification === '') ? (
          <>
            <Spinner variant={'page'} />
          </>
        ) : (sessionStorage.verification === 'Unverified') ? (
          <>
            <Title tagElement={'h1'} variant={'heading-1'} weight={'bold'}>
              {'Your account is not verified yet!'}
            </Title>
            <Title tagElement={'h2'} variant={'heading-2'} weight={'medium'}>
              {'Click here to verify your account'}
            </Title>
            <Paragraph variant={'title-1'}>
              {'You will be sent an email to verify your account'}
            </Paragraph>
            <Button type={'button'} onClick={() => handleVerify()}>
              {AuthReducer.buttonLoading ? <Spinner variant={'button'} /> : 'Send Account Verification Request'}
            </Button>
          </>
        ) : (
          <>
            <Title tagElement={'h1'} variant={'heading-1'} weight={'medium'}>
              {'Account Verified!'}
            </Title>
            <Button type={'button'} onClick={() => navigate('/')}>
              {'Back to Login'}
            </Button>
          </>
        )}
      </div>
    </section>
  )
};

export default VerifyAccountPage;
