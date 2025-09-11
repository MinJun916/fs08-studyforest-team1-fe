import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '@/lib/axios';

import Header from '@components/header/Header';
import Tag from '@components/tag/Tag';
import Timer from '@/components/timer/Timer';
import Toast from '@/components/toast/Toast';

import styles from '@/styles/pages/Focus.module.scss';
import ic_timer from '@/assets/icons/ic_timer.svg';

function Focus() {
  const { studyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(null); // 타이머 설정 시간
  const [showPauseToast, setShowPauseToast] = useState(false); // 일시정지 토스트 표시 여부

  // DetailStudyPage에서 전달받은 비밀번호 (Habit 페이지로 이동할 때 필요)
  const password = location.state?.password;

  // 화살표 아이콘 컴포넌트
  const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none">
      <path
        d="M1 1L6 6.5L1 12"
        stroke="#818181"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const fetchStudy = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/studies/${studyId}`);
      setStudy(res.data.data);
    } catch (err) {
      console.error('스터디 데이터 로딩 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudy();
  }, [studyId]);

  // 타이머 시작 시 설정 시간 저장
  const handleTimerStart = (minutes) => {
    setTimerMinutes(minutes);
    setShowPauseToast(false); // 시작 시 토스트 숨김
  };

  // 타이머 일시정지 시 토스트 표시
  const handleTimerPause = () => {
    setShowPauseToast(true);

    // 3초 후 토스트 자동 숨김
    setTimeout(() => {
      setShowPauseToast(false);
    }, 3000);
  };

  // 타이머 재개 시 토스트 숨김
  const handleTimerResume = () => {
    setShowPauseToast(false);
  };

  // 타이머 완료 시 API 호출 및 포인트 업데이트
  const handleTimerComplete = async (totalMinutes) => {
    try {
      setLoading(true);
      const focusTimeInMinutes = Math.floor(totalMinutes);
      const response = await api.post(
        `/focusSuccess?studyId=${studyId}&focusTime=${focusTimeInMinutes}&success=true`,
      );

      if (response.data.success) {
        await fetchStudy(); // 백엔드에서 업데이트된 스터디 데이터 다시 가져오기
        console.log(`포인트 ${response.data.focusPoint.point}점을 획득했습니다!`);
      }
    } catch (err) {
      console.error('타이머 완료 API 호출 실패:', err);
    } finally {
      setLoading(false);
      setTimerMinutes(null);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.focusWrapper}>
        <div className={styles.focusPage}>
          <div className={styles.header}>
            <div className={styles.titleAndButtons}>
              <div className={styles.title}>
                <span>{study?.nickName || ''}의 </span>
                <span>{study?.studyName || ''}</span>
              </div>
              <div className={styles.buttons}>
                <button
                  type="button"
                  onClick={() => navigate(`/habit/${studyId}`, { state: { password } })}
                >
                  오늘의 습관
                  <ArrowIcon />
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/study/${studyId}`, { state: { password } })}
                >
                  홈
                  <ArrowIcon />
                </button>
              </div>
            </div>
            <div className={styles.time}>
              <div className={styles.timeText}>현재까지 획득한 포인트</div>
              <div className={styles.timeContainer}>
                <Tag
                  bgColor={'rgba(255,255,255,0.3)'}
                  fontSize={16}
                  points={study?.totalPoints || 0}
                  type="add"
                />
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.contentHeader}>
              <div className={styles.title}>오늘의 집중</div>
              {timerMinutes && (
                <div className={styles.timerMinutes}>
                  <img src={ic_timer} alt="timer" />
                  <span>
                    {String(Math.floor(timerMinutes)).padStart(2, '0')}:
                    {String(Math.floor((timerMinutes % 1) * 60)).padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>
            <div className={styles.contentBody}>
              <div className={styles.timerContainer}>
                <Timer
                  ref={timerRef}
                  onTimerComplete={handleTimerComplete}
                  onTimerStart={handleTimerStart}
                  onTimerPause={handleTimerPause}
                  onTimerResume={handleTimerResume}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPauseToast && <Toast type="warning" />}
    </>
  );
}

export default Focus;
