import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
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
  const timerRef = useRef(null);

  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(kstTimeNow());

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
                <button type="button">
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
                <button type="button">
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
              <div className={styles.title}>오늘의 집중</div>
            </div>
            <div className={styles.contentBody}>
              <div className={styles.timerContainer}>
                <Timer ref={timerRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Focus;
