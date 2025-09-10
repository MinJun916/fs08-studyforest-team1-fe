import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Header from '@components/header/Header';
import HabitModal from '@components/modal/HabitModal';
import Tag from '@components/tag/Tag';
import styles from '@/styles/pages/Habit.module.scss';
import api from '@/lib/axios';
import { kstTimeNow } from '@/lib/dayjs.js';
import dayjs from 'dayjs';

function Habit() {
  const { studyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [study, setStudy] = useState(null);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(kstTimeNow());
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [habitChecks, setHabitChecks] = useState({});

  // DetailStudyPage에서 전달받은 비밀번호
  const password = location.state?.password;

  const fetchStudy = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/studies/${studyId}`);
      const studyData = res.data.data;
      setStudy(studyData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHabits = async () => {
    if (!password) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/habits/${studyId}/today?password=${password}`);
      const habitData = res.data.habits || [];
      setHabits(habitData);

      // 습관 체크 상태를 객체로 저장
      const habitChecksData = {};
      habitData.forEach((habit) => {
        if (habit.habitChecks && habit.habitChecks.length > 0) {
          // habitChecks 배열에서 첫 번째 요소 사용 (오늘 날짜의 체크)
          const habitCheck = habit.habitChecks[0];
          habitChecksData[habit.id] = {
            id: habitCheck.id,
            isCompleted: habitCheck.isCompleted,
            habitId: habitCheck.habitId,
          };
        } else {
          // habitCheck가 없으면 기본값으로 false 설정
          habitChecksData[habit.id] = {
            isCompleted: false,
            habitId: habit.id,
          };
        }
      });
      setHabitChecks(habitChecksData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudy();
  }, [studyId]);

  useEffect(() => {
    if (password) {
      fetchHabits();
    }
  }, [studyId, password]);

  // 실시간 시간 업데이트 (1분마다)
  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = kstTimeNow();
      setCurrentTime(newTime);

      // 매일 00:00이 되면 모든 습관을 미완료 상태로 리셋
      const now = dayjs().tz('Asia/Seoul');
      const isMidnight = now.hour() === 0 && now.minute() === 0;

      if (isMidnight) {
        // 모든 습관의 isCompleted를 false로 리셋
        setHabitChecks((prev) => {
          const resetHabits = {};
          Object.keys(prev).forEach((habitId) => {
            resetHabits[habitId] = {
              ...prev[habitId],
              isCompleted: false,
            };
          });
          return resetHabits;
        });

        // DB에서도 모든 습관을 미완료 상태로 리셋
        resetAllHabitsInDB();
      }
    }, 60000); // 60초 = 1분

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, []);

  const handleHabitClick = async (studyId, habitId) => {
    // 현재 상태를 미리 토글 (낙관적 업데이트)
    const currentCheck = habitChecks[habitId];
    const newIsCompleted = currentCheck ? !currentCheck.isCompleted : false;
    const currentPoints = study?.totalPoints ?? 0;

    // 포인트 변화 계산 (false → true: +3점, true → false: -3점)
    const pointChange = newIsCompleted ? 3 : -3;
    const newTotalPoints = Math.max(0, currentPoints + pointChange);

    // UI를 즉시 업데이트 (버튼 스타일 + 포인트)
    setHabitChecks((prev) => ({
      ...prev,
      [habitId]: {
        ...currentCheck,
        isCompleted: newIsCompleted,
      },
    }));

    setStudy((prev) => ({
      ...prev,
      totalPoints: newTotalPoints,
    }));

    try {
      setLoading(true);
      const res = await api.post(`/habitChecks/${studyId}/${habitId}/habitCheck/toggle`);
      const habitCheckData = res.data.data;

      // 서버 응답으로 최종 상태 업데이트
      setHabitChecks((prev) => ({
        ...prev,
        [habitId]: habitCheckData,
      }));

      // 서버의 실제 포인트로 최종 동기화
      if (res.data.data?.totalPoints !== undefined) {
        setStudy((prev) => ({
          ...prev,
          totalPoints: res.data.data.totalPoints,
        }));
      }
    } catch (err) {
      console.error(err);
      // 에러 발생 시 원래 상태로 롤백
      setHabitChecks((prev) => ({
        ...prev,
        [habitId]: currentCheck,
      }));
      setStudy((prev) => ({
        ...prev,
        totalPoints: currentPoints,
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleModifyClick = () => {
    if (!password) {
      alert('비밀번호가 필요합니다. 스터디 상세 페이지에서 다시 접근해주세요.');
      return;
    }
    setShowHabitModal(true);
  };

  const closeHabitModal = () => {
    setShowHabitModal(false);
    // 모달을 닫을 때마다 습관 데이터를 다시 가져오기
    fetchHabits();
  };

  const resetAllHabitsInDB = async () => {
    if (!password) return;

    try {
      // 모든 습관을 DB에서 미완료 상태로 리셋
      const habitIds = Object.keys(habitChecks);
      const resetPromises = habitIds.map((habitId) =>
        api.post(`/habitChecks/${studyId}/${habitId}/habitCheck/reset`, {
          password: password,
        }),
      );

      await Promise.all(resetPromises);
    } catch (err) {
      console.error('습관 리셋 중 오류 발생:', err);
    }
  };

  return (
    <>
      <Header />
      {showHabitModal && (
        <HabitModal onClose={closeHabitModal} studyId={studyId} password={password} />
      )}
      <div className={styles.habitWrapper}>
        <div className={styles.habitPage}>
          <div className={styles.header}>
            <div className={styles.titleAndButtons}>
              <div className={styles.title}>
                <span>{study?.nickName || '연우'}의 </span>
                <span>{study?.studyName || '개발공장'}</span>
              </div>
              <div className={styles.buttons}>
                <button
                  type="button"
                  onClick={() => navigate(`/focus/${studyId}`, { state: { password } })}
                >
                  오늘의 집중
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="13"
                    viewBox="0 0 7 13"
                    fill="none"
                  >
                    <path
                      d="M1 1L6 6.5L1 12"
                      stroke="#818181"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button type="button" onClick={() => navigate('/')}>
                  홈
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="13"
                    viewBox="0 0 7 13"
                    fill="none"
                  >
                    <path
                      d="M1 1L6 6.5L1 12"
                      stroke="#818181"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className={styles.time}>
              <div className={styles.timeText}>현재 시간</div>
              <div className={styles.timeContainer}>
                <div className={styles.timeValue}>{currentTime}</div>
                <Tag
                  bgColor={'rgba(255,255,255,0.3)'}
                  fontSize={16}
                  points={study?.totalPoints ?? 0}
                  type="total"
                />
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.contentHeader}>
              <div className={styles.title}>오늘의 습관</div>
              <button className={styles.modify} type="button" onClick={() => handleModifyClick()}>
                목록 수정
              </button>
            </div>
            <div className={styles.contentBody}>
              <div className={styles.habitList}>
                {habits.length === 0 && (
                  <div className={styles.nothingHabit}>
                    아직 습관이 없어요
                    <br />
                    목록 수정을 눌러 습관을 생성해보세요
                  </div>
                )}
                {habits &&
                  habits.map((habit) => (
                    <button
                      className={`${styles.habitName} ${
                        habitChecks[habit.id]?.isCompleted === true
                          ? styles.completeHabit
                          : styles.incompleteHabit
                      }`}
                      type="button"
                      key={habit.id}
                      onClick={() => handleHabitClick(studyId, habit.id)}
                    >
                      {habit.name}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Habit;
