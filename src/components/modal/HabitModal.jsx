import { useState, useEffect } from 'react';
import api from '@/lib/axios.js';

import Popup from '@/components/popup/Popup.jsx';
import HabitList from '@components/modal/HabitList.jsx';
import styles from '@styles/components/modal/HabitModal.module.scss';
import Button from '@/components/button/Button.jsx';

function HabitModal({ studyId = 'b6d43784-2ca5-4102-9cc9-3005056d2506', password = '1234' }) {
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
      <div className={styles.modal}>
        <div className={styles.title}>습관 목록</div>
        <div className={styles.habitContent}>
          <div className={styles.habitListContainer}>
            <HabitList habits={habits} studyId={studyId} />
          </div>
          <div className={styles.controlButtons}>
            <Button childrenType="cancel" />
            <Button childrenType="completeModify" />
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default HabitModal;
