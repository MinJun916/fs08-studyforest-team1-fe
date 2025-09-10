import { useState, useEffect } from 'react';
import api from '@/lib/axios.js';

import Popup from '@/components/popup/Popup.jsx';
import HabitList from '@components/modal/HabitList.jsx';
import styles from '@styles/components/modal/HabitModal.module.scss';
import Button from '@/components/button/Button.jsx';

function HabitModal({ studyId, password, onClose }) {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    try {
      const res = await api.get(`/habits/${studyId}/today?password=${password}`);
      setHabits(res.data.habits || []);
    } catch (err) {
      console.error(err);
      setHabits([]);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [studyId, password]);

  return (
    <Popup>
      <div className={styles.title}>습관 목록</div>
      <div className={styles.habitContent}>
        <div className={styles.habitListContainer}>
          <HabitList habits={habits} studyId={studyId} />
        </div>
        <div className={styles.controlButtons}>
          <Button childrenType="cancel" onClick={onClose} />
          <Button childrenType="completeModify" onClick={onClose} />
        </div>
      </div>
    </Popup>
  );
}

export default HabitModal;
