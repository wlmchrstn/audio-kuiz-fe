import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './major-card.module.scss';

// Components
import Button from '../../components/button/button';
import Modal from '../../components/modal/modal';

// Modules
import EditMajorForm from '../edit-major-form/edit-major-form';

// Assets
import { ReactComponent as DeleteIcon } from '../../assets/icons/fi_trash.svg';

// Actions
import { deleteMajor } from '../../stores/actions/ActionMajor';

const MajorCard = ({ value, notification, refresh }) => {
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this major?") === true) {
      return dispatch(deleteMajor(id, notification, refresh));
    } else {
      return null;
    }
  };

  return (
    <div className={styles.container}>
      <Modal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        className={styles.modal}
      >
        <EditMajorForm
          id={value._id}
          value={value.name}
          setNotification={notification}
          setIsOpen={setIsEditOpen}
          setRefresh={refresh}
        />
      </Modal>
      {/* <UserIcon stroke='#fff' /> */}
      <div className={styles.left}>
        <div className={styles.wrapper}>
          <p>{value.name}</p>
        </div>
      </div>
      <div className={styles.right}>
        <Button variant={'primary'} type={'button'} onClick={() => setIsEditOpen(true)}>
          {'Edit'}
        </Button>
        <div className={styles.cta} onClick={() => handleDelete(value._id)}>
          <DeleteIcon stroke='#fff' />
        </div>
      </div>
    </div>
  );
};

export default MajorCard;
