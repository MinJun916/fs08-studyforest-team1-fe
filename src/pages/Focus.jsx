import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Header from '@components/header/Header';
import Tag from '@components/tag/Tag';
import Timer from '@/components/timer/Timer';
import styles from '@/styles/pages/Focus.module.scss';
import api from '@/lib/axios';
import { kstTimeNow } from '@/lib/dayjs.js';
import dayjs from 'dayjs';

function Focus() {
  const { studyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(kstTimeNow());
  const [focusPoints, setFocusPoints] = useState(0); // 포커스로 획득한 포인트
  const [apiError, setApiError] = useState(null); // API 에러 메시지
  const [timerMinutes, setTimerMinutes] = useState(null); // 타이머 설정 시간

  // DetailStudyPage에서 전달받은 비밀번호 (Habit 페이지로 이동할 때 필요)
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

  useEffect(() => {
    fetchStudy();
  }, [studyId]);

  // 실시간 시간 업데이트 (1분마다)
  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = kstTimeNow();
      setCurrentTime(newTime);
    }, 60000); // 60초 = 1분

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, []);

  // 타이머 시작 시 설정 시간 저장
  const handleTimerStart = (minutes) => {
    setTimerMinutes(minutes);
  };

  // 타이머 완료 시 API 호출 및 포인트 업데이트
  const handleTimerComplete = async (totalMinutes) => {
    try {
      setLoading(true);
      setApiError(null); // 이전 에러 초기화

      // API 요청
      const response = await api.post(
        `/focusSuccess?studyId=${studyId}&focusTime=${totalMinutes}&success=true`,
      );

      if (response.data.success) {
        const { focusTime, focusPoint } = response.data;
        setFocusPoints(focusPoint.point);

        // 스터디 총 포인트 업데이트
        setStudy((prev) => ({
          ...prev,
          totalPoints: (prev?.totalPoints || 0) + focusPoint.point,
        }));

        // 성공 메시지 (선택사항)
        console.log(`포인트 ${focusPoint.point}점을 획득했습니다!`);
      } else {
        throw new Error('API 응답이 실패했습니다.');
      }
    } catch (err) {
      console.error('타이머 완료 API 호출 실패:', err);
      setError(err);

      // 사용자 친화적인 에러 메시지
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        '포인트 저장 중 오류가 발생했습니다. 다시 시도해주세요.';
      setApiError(errorMessage);

      // 임시로 포인트 계산 (API 실패 시 대안)
      const calculatedPoints = Math.floor(totalMinutes / 25) * 10;
      setFocusPoints(calculatedPoints);
      setStudy((prev) => ({
        ...prev,
        totalPoints: (prev?.totalPoints || 0) + calculatedPoints,
      }));
    } finally {
      setLoading(false);
      setTimerMinutes(null); // 타이머 완료 시 설정 시간 초기화
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
                <span>{study?.nickName || '연우'}의 </span>
                <span>{study?.studyName || '개발공장'}</span>
              </div>
              <div className={styles.buttons}>
                <button
                  type="button"
                  onClick={() => navigate(`/habit/${studyId}`, { state: { password } })}
                >
                  오늘의 습관
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
              <div className={styles.timeText}>현재까지 획득한 포인트</div>
              <div className={styles.timeContainer}>
                <Tag
                  bgColor={'rgba(255,255,255,0.3)'}
                  fontSize={16}
                  points={focusPoints}
                  type="add"
                />
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.contentHeader}>
              <div className={styles.title}>오늘의 집중</div>
              {timerMinutes && <div>{timerMinutes}분 타이머</div>}
            </div>
            <div className={styles.contentBody}>
              <div className={styles.timerContainer}>
                <Timer
                  ref={timerRef}
                  onTimerComplete={handleTimerComplete}
                  onTimerStart={handleTimerStart}
                  disabled={loading}
                />
                {loading && (
                  <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    포인트를 저장하는 중...
                  </div>
                )}
                {apiError && (
                  <div
                    style={{
                      marginTop: '20px',
                      textAlign: 'center',
                      color: '#f50e0e',
                      fontSize: '14px',
                    }}
                  >
                    {apiError}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Focus;
