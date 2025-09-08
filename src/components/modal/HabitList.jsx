import { useState, useEffect } from 'react';
import api from '@/lib/axios.js';

import styles from '@styles/components/modal/HabitList.module.scss';
import Ic_delete from '@assets/buttons/Ic_delete.svg';
import Ic_plusIcon from '@assets/buttons/Ic_plusIcon.svg';

function HabitList({ habits: initialHabits, studyId }) {
  const [habits, setHabits] = useState(initialHabits || []);
  const [newHabitName, setNewHabitName] = useState('');
  const [isAddingHabit, setIsAddingHabit] = useState(false);

  // props가 변경될 때 상태 업데이트
  useEffect(() => {
    if (initialHabits) {
      setHabits(initialHabits);
    }
  }, [initialHabits]);

  const handleAddHabit = async () => {
    if (!newHabitName.trim()) {
      alert('습관 이름을 입력해주세요.');
      return;
    }

    try {
      // API 요청
      const response = await api.post(`/habitModify/create/${studyId}`, { name: newHabitName });

      // 성공 시 로컬 상태에 새 습관 추가
      const newHabit = {
        id: response.data.id,
        name: newHabitName,
      };

      setHabits((prevHabits) => [...prevHabits, newHabit]);

      // 입력 필드 초기화
      setNewHabitName('');
      setIsAddingHabit(false);
    } catch (error) {
      console.error('습관 추가 실패:', error);
      alert('습관 추가에 실패했습니다.');
    }
  };

  const handleInputChange = (e) => {
    setNewHabitName(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddHabit();
    }
  };

  const handleDeleteHabit = (habitId) => {
    // 로컬 상태에서 해당 습관만 제거
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== habitId));
  };

  const handleDeleteClick = (habitId) => {
    handleDeleteHabit(habitId);
  };

  return (
    <div className={styles.habitList}>
      {habits.map((habit, index) => (
        <div key={habit.id || index} className={styles.habitRow}>
          <div className={styles.habitItem}>
            <div className={styles.habitName}>{habit.name}</div>
          </div>
          <button className={styles.deleteBtn} onClick={() => handleDeleteClick(habit.id)}>
            <img src={Ic_delete} alt="delete" />
          </button>
        </div>
      ))}
      {/* 습관 입력 필드 */}
      {isAddingHabit && (
        <div className={styles.habitRow}>
          <div className={`${styles.habitItem} ${styles.addHabitItem}`}>
            <input
              type="text"
              value={newHabitName}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="습관을 입력하고 Enter를 눌러주세요"
              className={styles.habitInput}
              autoFocus
            />
          </div>
        </div>
      )}

      {/* 습관 추가 버튼 */}
      <div className={styles.habitRow}>
        <button
          className={`${styles.habitItem} ${styles.addHabitItem} ${styles.addHabit}`}
          onClick={() => setIsAddingHabit(!isAddingHabit)}
        >
          <img src={Ic_plusIcon} alt="습관 추가" />
        </button>
      </div>
    </div>
  );
}

export default HabitList;
